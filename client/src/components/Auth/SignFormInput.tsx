import styled from '@emotion/styled'
import Input from '../Custom/Inputs/Input'

export const SignFormInput = styled(Input)(({ theme }) => ({
  '.MuiInputLabel-root': {
    fontSize: '0.75rem',
    color: 'red !important',
  },
  '.MuiInputBase-root': {
    width: '100%',
    marginBottom: '0.5rem',
  },

  '&:error': {
    borderColor: 'red',
  },
}))
