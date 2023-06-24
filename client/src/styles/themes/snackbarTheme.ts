import { MaterialDesignContent } from 'notistack'
import { styled } from '@mui/material/styles'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    borderRadius: '2px',
  },
  '&.notistack-MuiContent-error': {
    borderRadius: '2px',
  },
  '&.notistack-MuiContent-default': {
    borderRadius: '2px',
  },
  '&.notistack-MuiContent-warning': {
    borderRadius: '2px',
  },
  '&.notistack-MuiContent-info': {
    borderRadius: '2px',
  },
}))

export const themeSnackbar = {
  success: StyledMaterialDesignContent,
  error: StyledMaterialDesignContent,
  default: StyledMaterialDesignContent,
  warning: StyledMaterialDesignContent,
  info: StyledMaterialDesignContent,
}
