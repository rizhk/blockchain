import { FieldAttributes, FieldProps } from 'formik';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaFieldProps extends FieldProps<{ token: string }> {
  siteKey: string;
  isInvisible?: boolean;
  recaptchaRef: React.RefObject<ReCAPTCHA>;
}

export const RecaptchaField = ({
  field: { name, ...field },
  form,
  siteKey,
  isInvisible = true,
  recaptchaRef,
  ...props
}: RecaptchaFieldProps) => {
  const handleChange = (token: string | null) => {
    form.setFieldError(name, undefined);
    field.onChange(token);
    form.setFieldValue(name, token);
  };
  const handleExpired = () => {
    form.setFieldValue(name, '');
  };

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      size={isInvisible ? 'invisible' : 'normal'}
      onExpired={handleExpired}
      sitekey={siteKey}
      onChange={handleChange}
      id={name}
      {...props}
    />
  );
};

export default RecaptchaField;
