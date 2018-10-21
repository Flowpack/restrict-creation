import {takeLatest, take, select, call, put, race} from 'redux-saga/effects';
import {$get} from 'plow-js';
import {actionTypes, selectors} from '@neos-project/neos-ui-redux-store';
import {actions as localActions, actionTypes as localActionTypes, selectors as localSelectors} from './redux';
import {crNodeOperations} from '@neos-project/neos-ui-sagas';

export function * addNode({globalRegistry}) {
    const nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');

    yield takeLatest(actionTypes.CR.Nodes.COMMENCE_CREATION, function* (action) {
        const {referenceNodeContextPath, referenceNodeFusionPath} = action.payload;

        const state = yield select();
        const restrictCreationPreset = localSelectors.restrictCreationSelector(state);

        // Show restrict creation dialog if mode is not null
        let showRestrictCreationDialog = Boolean($get('restrictCreation.mode', restrictCreationPreset));
        const documentNodesOnly = $get('restrictCreation.documentNodesOnly', restrictCreationPreset);

        if (documentNodesOnly) {
            const getNodeByContextPathSelector = selectors.CR.Nodes.makeGetNodeByContextPathSelector(referenceNodeContextPath);
            const referenceNode = yield select(getNodeByContextPathSelector);
            const isDocument = nodeTypesRegistry.hasRole($get('nodeType', referenceNode), 'document');
            // Skip the dialog if not document node
            showRestrictCreationDialog = isDocument;
        }

        const context = {
            nodeTypesRegistry,
            referenceNodeContextPath,
            referenceNodeFusionPath
        };
        if (showRestrictCreationDialog) {
            yield put(localActions.openDialog());
            const waitForNextAction = yield race([
                take(localActionTypes.OPEN_DIALOG),
                take(localActionTypes.CLOSE_DIALOG),
                take(localActionTypes.CONTINUE_CREATION)
            ]);
            const nextAction = Object.values(waitForNextAction)[0];

            if (nextAction.type === localActionTypes.CONTINUE_CREATION) {
                yield call(crNodeOperations.addNode.nodeCreationWorkflow, context);
            } else {
                return;
            }
        } else {
            yield call(crNodeOperations.addNode.nodeCreationWorkflow, context);
        }
    });
}
