import React, { useEffect } from 'react';
import { TextField, Typography, Divider } from '@material-ui/core';
import { useLanguageLocale, AccountDetailInformation } from '@pxblue/react-auth-shared';
import { useDialogStyles } from '../../styles';

export type AccountDetailsProps = {
    onDetailsChanged: (details: (AccountDetailInformation & { valid: boolean }) | null) => void;
    initialDetails?: AccountDetailInformation;
};

/**
 * Component that renders a screen requesting user first and last name and optional phone number.
 *
 * @param initialDetails an object specifying any details to pre-fill
 * @param onDetailsChanged a function to call when any of the detail fields values change
 *
 * @category Component
 */
export const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
    const { onDetailsChanged, initialDetails } = props;
    const classes = useDialogStyles();
    const { t } = useLanguageLocale();

    const [firstNameInput, setFirstNameInput] = React.useState(initialDetails ? initialDetails.firstName : '');
    const [lastNameInput, setLastNameInput] = React.useState(initialDetails ? initialDetails.lastName : '');
    const [phoneInput, setPhoneInput] = React.useState(initialDetails ? initialDetails.phone : '');

    useEffect((): void => {
        // validation checks
        const valid = firstNameInput !== '' && lastNameInput !== '';
        onDetailsChanged({ firstName: firstNameInput, lastName: lastNameInput, phone: phoneInput, valid });
    }, [onDetailsChanged, firstNameInput, lastNameInput, phoneInput]);

    return (
        <>
            <Typography>{t('REGISTRATION.INSTRUCTIONS.ACCOUNT_DETAILS')}</Typography>
            <Divider className={classes.fullDivider} />
            <TextField
                id="first"
                label={t('FORMS.FIRST_NAME')}
                fullWidth
                value={firstNameInput}
                onChange={(evt): void => {
                    setFirstNameInput(evt.target.value);
                }}
                variant="filled"
            />
            <TextField
                id="last"
                label={t('FORMS.LAST_NAME')}
                fullWidth
                value={lastNameInput}
                onChange={(evt): void => {
                    setLastNameInput(evt.target.value);
                }}
                variant="filled"
                className={classes.textField}
            />
            <TextField
                id="phone"
                label={`${t('FORMS.PHONE_NUMBER')} (${t('LABELS.OPTIONAL')})`}
                fullWidth
                value={phoneInput}
                onChange={(evt): void => {
                    setPhoneInput(evt.target.value);
                }}
                variant="filled"
                className={classes.textField}
            />
        </>
    );
};