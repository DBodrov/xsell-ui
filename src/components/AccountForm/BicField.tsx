import React from 'react';
import { ContextField, Label, ErrorText, SimpleField, IFieldContext } from 'lib/components/Forma2';
import { BicSearch } from 'lib/components/data-entry';
import { BIC } from 'utils/masks';
import { Environment } from 'services';

const showError = (ctx: IFieldContext) => {
    const { hasTouched, hasError } = ctx;
    return hasTouched && hasError;
};

export function BicField() {
    return Environment.ProdMode ? (
        <SimpleField
            name="bankIdCode"
            type="mask"
            mask={BIC}
            label="БИК"
            placeholder="БИК вашего банка"
            autoComplete="off"
        />
    ) : (
        <ContextField name="bankIdCode">
            {fieldCtx => (
                <div style={{ marginBottom: '10px' }}>
                    <Label text="БИК банка" htmlFor={fieldCtx.name} />
                    <BicSearch
                        name={fieldCtx.name}
                        onChangeHandler={fieldCtx.handleChangeField}
                        onBlurHandler={fieldCtx.handleBlur}
                        autoComplete="off"
                        placeholder="БИК банка"
                        value={fieldCtx.value.bic}
                        hasError={fieldCtx.hasError}
                    />
                    {showError(fieldCtx) && <ErrorText errorMessage={fieldCtx.errorMessage} />}
                </div>
            )}
        </ContextField>
    );
}
