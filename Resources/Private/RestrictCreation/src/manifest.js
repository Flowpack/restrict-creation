import manifest from '@neos-project/neos-ui-extensibility';
import RestrictCreationDialog from './RestrictCreationDialog';
import {reducer} from './redux';
import {addNode} from './sagas';

manifest('Flowpack.RestrictCreation:RestrictCreation', {}, globalRegistry => {
    const sagasRegistry = globalRegistry.get('sagas');

    sagasRegistry.set('neos-ui/CR/NodeOperations/addNode', {
        saga: addNode
    });

    const reducersRegistry = globalRegistry.get('reducers');
    reducersRegistry.set('Flowpack.RestrictCreation:RestrictCreation', {reducer});

    const containerRegistry = globalRegistry.get('containers');
    containerRegistry.set('Modals/RestrictCreationDialog', RestrictCreationDialog);
});
