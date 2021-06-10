import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import CloseIcon from "@material-ui/icons/Close"
import {
  Box,
  createStyles,
  IconButton,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

type DialogProps = {
  children?: React.ReactNode
  onClose: () => void
  open: boolean
  title: string
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  title: string
  onClose: () => void
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { title, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Box display="flex ">
        <Box flexGrow={1}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        {onClose ? (
          <Box pl={5}>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </MuiDialogTitle>
  )
})

export const CustomDialog: React.FC<DialogProps> = (props: DialogProps) => {
  const { open, children, title, onClose } = props
  const [, setOpen] = React.useState(open)
  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          title={title}
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  )
}
