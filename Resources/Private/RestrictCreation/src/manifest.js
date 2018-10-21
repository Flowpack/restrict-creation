import manifest from '@neos-project/neos-ui-extensibility';
import RestrictCreationDialog from './RestrictCreationDialog';
import {reducer} from './redux';
import {makeAddNode} from './sagas';

manifest('Flowpack.RestrictCreation:RestrictCreation', {}, globalRegistry => {
    const sagasRegistry = globalRegistry.get('sagas');

    const originalAddNodeSaga = sagasRegistry.get('neos-ui/CR/NodeOperations/addNode');
    sagasRegistry.set('neos-ui/CR/NodeOperations/addNode', {
        saga: makeAddNode(originalAddNodeSaga.nodeCreationWorkflow)
    });

    const reducersRegistry = globalRegistry.get('reducers');
    reducersRegistry.set('Flowpack.RestrictCreation:RestrictCreation', {reducer});

    const containerRegistry = globalRegistry.get('containers');
    containerRegistry.set('Modals/RestrictCreationDialog', RestrictCreationDialog);
});
