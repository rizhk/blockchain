import { useMounted } from 'hooks/use-mounted';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { FormikContextType, FormikProvider } from 'formik';
import { Box, TextField } from '@mui/material';
import { CheckCircle } from '../../icons/check-circle';
import { ErrorOutline } from '../../icons/error-outline';
import { useTranslation } from 'react-i18next';

const PasswordChecklist = dynamic(() => import('react-password-checklist'), {
  ssr: false,
});

interface PasswordCheckProps {
  formik: FormikContextType<any>;
  setValid: (valid: boolean) => void;
  passwordLabel: string;
  confirmPasswordLabel: string;
}

export const PasswordCheck = (props: PasswordCheckProps) => {
  const formik = props.formik;

  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        label={props.passwordLabel}
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {formik.values.password != '' && (
        <PasswordChecklist
          rules={['minLength', 'number', 'capital', 'lowercase']}
          minLength={8}
          value={formik.values.password}
          valueAgain={formik.values.confirmPassword}
          onChange={props.setValid}
          iconComponents={{
            ValidIcon: <CheckCircle sx={{ mr: 1, my: 0.5, width: '20px' }} />,
            InvalidIcon: <ErrorOutline sx={{ mr: 1, my: 0.5, width: '20px' }} />,
          }}
          style={{ fontSize: '14px', color: '#6B7280' }}
          messages={{
            minLength: t('account.passwordMinLength'),
            number: t('account.passwordNumber'),
            capital: t('account.passwordCapital'),
            lowercase: t('account.passwordLowercase'),
          }}
        />
      )}
      <TextField
        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
        fullWidth
        label={props.confirmPasswordLabel}
        margin="normal"
        name="confirmPassword"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.confirmPassword}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#6B7280' }}>
        {formik.values.password == formik.values.confirmPassword && formik.values.password != '' && (
          <CheckCircle sx={{ mr: 1, my: 0.5, width: '20px' }} />
        )}
        {formik.values.password != formik.values.confirmPassword && formik.values.password != '' && (
          <ErrorOutline sx={{ mr: 1, my: 0.5, width: '20px' }} />
        )}
        {formik.values.password != '' && t('account.passwordMatch')}
      </Box>
    </FormikProvider>
  );
};
