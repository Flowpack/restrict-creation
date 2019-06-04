import {createAction} from 'redux-actions';
import {handleActions} from '@neos-project/utils-redux';
import reduce from 'lodash.reduce';
import {$get, $set} from 'plow-js';
import {createSelector} from 'reselect';
import {selectors as foreignSelectors, actionTypes as foreignActionTypes} from '@neos-project/neos-ui-redux-store';

// Finds amoung currently active dimension presets the preset with the strictest settings (i.e. `disallow` takes precedence over `warn`)
// and returns its full config, overlaying `dimensionName` on top.
const restrictCreationSelector = createSelector(
    [
        foreignSelectors.CR.ContentDimensions.activePresets
    ],
    activePresets => {
        return reduce(activePresets, (reduction, dimensionConfig, dimensionName) => {
			const restrictCreationConfig = $set(
				'dimensionName',
				dimensionName,
				dimensionConfig
			);
			const restrictCreationMode = $get('restrictCreation.mode', dimensionConfig);
			if ($get('restrictCreation.mode', reduction) === 'disallow') {
				return reduction;
			}
			if (restrictCreationMode === 'disallow' || restrictCreationMode === 'warn') {
				return restrictCreationConfig;
			}
			return reduction;
		}, null);
    }
);

// Finds the origin dimension preset according to restrict creation configuration
const restrictCreationOriginPresetSelector = createSelector(
    [
        restrictCreationSelector,
        $get('cr.contentDimensions.byName')
    ],
    (restrictCreationPresetConfig, contentDimensions) => {
        const dimensionName = $get('dimensionName', restrictCreationPresetConfig);
        const originPresetName = $get('restrictCreation.originPreset', restrictCreationPresetConfig);
        if (!originPresetName) {
            return null;
        }
        const originPreset = $get([dimensionName, 'presets', originPresetName], contentDimensions);
        return originPreset;
    }
);

export const selectors = {
    restrictCreationSelector,
    restrictCreationOriginPresetSelector
};

const OPEN_DIALOG = '@Flowpack.RestrictCreation/OPEN_DIALOG';
const CLOSE_DIALOG = '@Flowpack.RestrictCreation/CLOSE_DIALOG';
const CONTINUE_CREATION = '@Flowpack.RestrictCreation/CONTINUE_CREATION';

//
// Export the action types
//
export const actionTypes = {
    OPEN_DIALOG,
    CLOSE_DIALOG,
    CONTINUE_CREATION
};

const openDialog = createAction(OPEN_DIALOG);
const closeDialog = createAction(CLOSE_DIALOG);
const continueCreation = createAction(CONTINUE_CREATION);

//
// Export the actions
//
export const actions = {
    openDialog,
    closeDialog,
    continueCreation
};

//
// Export the reducer
//
export const reducer = handleActions({
    [OPEN_DIALOG]: () => $set('ui.restrictCreationDialog.isOpen', true),
    [CLOSE_DIALOG]: () => $set('ui.restrictCreationDialog.isOpen', false),
    [CONTINUE_CREATION]: () => $set('ui.restrictCreationDialog.isOpen', false),
    [foreignActionTypes.CR.ContentDimensions.SELECT_PRESET]: () => $set('ui.restrictCreationDialog.isOpen', false)
});
