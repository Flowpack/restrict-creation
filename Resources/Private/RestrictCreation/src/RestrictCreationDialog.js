import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$get, $transform} from 'plow-js';

import {Button, Dialog, Icon} from '@neos-project/react-ui-components';
import I18n from '@neos-project/neos-ui-i18n';
import {actions} from '@neos-project/neos-ui-redux-store';
import {actions as localActions, selectors as localSelectors} from './redux';

@connect($transform({
    restrictCreationDialogIsOpen: $get('ui.restrictCreationDialog.isOpen'),
    restrictCreationPresetConfig: localSelectors.restrictCreationSelector,
    restrictCreationOriginPreset: localSelectors.restrictCreationOriginPresetSelector
}), {
    openDialog: localActions.openDialog,
    closeDialog: localActions.closeDialog,
    continueCreation: localActions.continueCreation,
    selectPreset: actions.CR.ContentDimensions.selectPreset
})
export default class RestrictCreationDialog extends PureComponent {
    static propTypes = {
        restrictCreationDialogIsOpen: PropTypes.bool,
        restrictCreationPresetConfig: PropTypes.object,
        restrictCreationOriginPreset: PropTypes.object,
        openDialog: PropTypes.func.isRequired,
        closeDialog: PropTypes.func.isRequired,
        continueCreation: PropTypes.func.isRequired,
        selectPreset: PropTypes.func.isRequired
    };

    handleAbort = () => {
        this.props.closeDialog();
    }

    handleDismiss = () => {
        this.props.continueCreation();
    }

    handleSwitchPreset = () => {
        const {restrictCreationPresetConfig, restrictCreationOriginPreset} = this.props;
        const dimensionName = $get('dimensionName', restrictCreationPresetConfig);
        const originPresetValue = $get('values.0', restrictCreationOriginPreset);
        this.props.selectPreset({[dimensionName]: originPresetValue});
    }

    renderTitle() {
        return (
            <div>
                <Icon icon="exclamation-triangle" />
                <span style={{marginLeft: 15}}>
                    <I18n id="Flowpack.RestrictCreation:Main:title" />
                </span>
            </div>
        );
    }

    renderAbort() {
        return (
            <Button
                key="cancel"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleAbort}
            >
                <I18n id="Neos.Neos:Main:cancel" />
            </Button>
        );
    }

    renderSwitch() {
        const {restrictCreationOriginPreset} = this.props;
        const originPresetLabel = $get('label', restrictCreationOriginPreset);
        if (!originPresetLabel) {
            return null;
        }
        return (
            <Button
                key="switch"
                style="brand"
                hoverStyle="brand"
                onClick={this.handleSwitchPreset}
            >
                <I18n
                    id="Flowpack.RestrictCreation:Main:switchTo"
                    params={{
                        originPresetLabel
                    }}
                />
            </Button>
        );
    }
    renderDismiss() {
        return (
            <Button
                key="dismiss"
                style="warn"
                hoverStyle="brand"
                onClick={this.handleDismiss}
            >
                <I18n id="Flowpack.RestrictCreation:Main:continue" />
            </Button>
        );
    }

    disallowModal() {
        const {restrictCreationPresetConfig, restrictCreationOriginPreset} = this.props;
        const currentPresetLabel = $get('label', restrictCreationPresetConfig);
        const originPresetLabel = $get('label', restrictCreationOriginPreset);
        return (
            <Dialog
                actions={[this.renderAbort(), this.renderSwitch()]}
                title={this.renderTitle()}
                onRequestClose={this.handleAbort}
                isOpen
            >
                <div style={{padding: 15}}>
                    <I18n
                        id="Flowpack.RestrictCreation:Main:bodyText1--disallow"
                        params={{
                            currentPresetLabel
                        }}
                    />
                    {originPresetLabel && (
                        <div>
                            <I18n
                                id="Flowpack.RestrictCreation:Main:bodyText2--disallow"
                                params={{
                                    originPresetLabel
                                }}
                            />
                        </div>
                    )}
                </div>
            </Dialog>
        );
    }

    warnModal() {
        const {restrictCreationPresetConfig, restrictCreationOriginPreset} = this.props;
        const currentPresetLabel = $get('label', restrictCreationPresetConfig);
        const originPresetLabel = $get('label', restrictCreationOriginPreset);
        return (
            <Dialog
                actions={[this.renderAbort(), this.renderDismiss(), this.renderSwitch()]}
                title={this.renderTitle()}
                onRequestClose={this.handleAbort}
                isOpen
            >
                <div style={{padding: 15}}>
                    <I18n
                        id="Flowpack.RestrictCreation:Main:bodyText1--warn"
                        params={{
                            currentPresetLabel
                        }}
                    />
                    {originPresetLabel && (
                        <div>
                            <I18n
                                id="Flowpack.RestrictCreation:Main:bodyText2--warn"
                                params={{
                                    originPresetLabel
                                }}
                            />
                        </div>
                    )}
                </div>
            </Dialog>
        );
    }

    render() {
        const {restrictCreationDialogIsOpen, restrictCreationPresetConfig} = this.props;

        if (!restrictCreationDialogIsOpen) {
            return null;
        }

        if ($get('restrictCreation.mode', restrictCreationPresetConfig) === 'disallow') {
            return this.disallowModal();
        }
        if ($get('restrictCreation.mode', restrictCreationPresetConfig) === 'warn') {
            return this.warnModal();
        }
        return null;
    }
}
