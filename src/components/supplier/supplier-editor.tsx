import React from 'react'
import { css } from '@emotion/css'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { SubmitHandler } from 'react-hook-form'
import {
  TextFieldElement,
  FormContainer,
  FormContainerProps,
} from 'react-hook-form-mui'

import { Supplier } from '@/types'
import useSupplierStore from '@/stores/supplier.store'

const defaultValues = {
  name: '',
  website: '',
  comments: '',
  deliveryTime: '',
}

interface SupplierEditorProps {
  onSuccess?: SubmitHandler<Supplier>

  [restProps: string]: any
}

const SupplierEditor: React.ForwardRefExoticComponent<SupplierEditorProps> =
  React.forwardRef((props, ref) => {
    const { onSuccess = () => {}, ...restProps } = props

    const supplierStore = useSupplierStore()
    const { currentSupplier } = supplierStore
    const theme = useTheme()

    const formContext = useForm({ defaultValues })
    const { handleSubmit, control, reset } = formContext

    React.useEffect(() => {
      const values = Object.assign({}, defaultValues, currentSupplier, {
        deliveryTime: `${currentSupplier?.deliveryTime || ''}`,
      })
      reset(values)
    }, [currentSupplier])

    const handleOnSubmit: SubmitHandler<any> = (values: any, e) => {
      const supplier: Supplier = {
        ...values,
        deliveryTime: values.deliveryTime
          ? Number(values.deliveryTime)
          : undefined,
      }
      reset()
      onSuccess(supplier)
    }

    return (
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(handleOnSubmit)}
        FormProps={{
          id: 'supplier-form',
          autoComplete: 'off',
          className: css({
            flex: 1,
            minWidth: theme.spacing(30),
            [theme.breakpoints.up('md')]: { maxWidth: theme.spacing(60) },
          }),
          ...restProps,
        }}
      >
        <DevTool control={control} placement="top-right" />
        <Stack>
          <Stack spacing={1}>
            <TextFieldElement
              control={control}
              id="supplier-name"
              label="Name"
              name="name"
              required
              variant="standard"
            />
            <TextFieldElement
              id="supplier-website"
              type="url"
              validation={{
                pattern: {
                  value:
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: 'The URL is invalid',
                },
              }}
              name="website"
              label="Website"
              variant="standard"
            />
            <FormControl>
              <Stack>
                <FormLabel
                  id="supplier-comment-label"
                  sx={{ mt: theme.spacing(3) }}
                >
                  {'Kommentar'}
                </FormLabel>
                <TextFieldElement
                  id="supplier-comment"
                  aria-labelledby="supplier-comment-label"
                  name="comments"
                  multiline
                  minRows={5}
                />
              </Stack>
            </FormControl>
            <TextFieldElement
              id="supplier-delivery-time"
              validation={{
                pattern: { value: /^\d+$/, message: 'Must be an integer' },
                min: { value: 0, message: 'Must be greater than zero' },
              }}
              name="deliveryTime"
              label="Lieferzeit"
              variant="standard"
            />
          </Stack>
        </Stack>
      </FormContainer>
    )
  })

export default SupplierEditor
