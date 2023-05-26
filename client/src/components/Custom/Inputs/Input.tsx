import styled from '@mui/material/styles/styled'
import { FormControl, FormHelperText, InputBase, InputLabel } from '@mui/material'
import { InputComponent } from './types'
import styles from './Input.module.scss'

const Input: InputComponent = ({ label, helperText, className, ...other }) => {
  return (
    <FormControl className={className} sx={{ display: 'block' }} fullWidth>
      {label && (
        <LabelCustom shrink htmlFor={other.id} className={styles.label} error={other.error}>
          {label}
        </LabelCustom>
      )}
      <InputCustom {...other} />
      {helperText && (
        <HelperTextCustom error={other.error}>
          {helperText}
        </HelperTextCustom>
      )}
    </FormControl>
  )
}

const HelperTextCustom = styled(FormHelperText)(({ theme }) => ({
  marginLeft: 0,

  '&.Mui-error': {
    color: '#d32f2f !important',
    fontSize: '0.75rem',
  },

}))

const LabelCustom = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root': {
    position: 'initial',
    marginBottom: '0.5rem',
    transform: 'none',

    '&.Mui-focused': {
      color: '#2B2B2B',
    },
    '&.Mui-error': {
      color: '#d32f2f !important',
    },
  },
}))

const InputCustom = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'var(--substrate2)',
    color: 'var(--main-text)',
    fontSize: '1rem',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `#767676 0 0 0 0.1rem`,
    },
  },
  '&.Mui-error': {
    '& .MuiInputBase-input': {
      boxShadow: `red 0 0 0 0.1rem`,
    },
  },
}))

export default Input
