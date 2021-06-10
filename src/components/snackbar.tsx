import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

type PropType = {
  open: boolean
  text: string
}

export const CustomSnackbar: React.FC<PropType> = ({
  open,
  text,
}: PropType) => {
  const [Open, setOpen] = React.useState(open)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {text}
        </Alert>
      </Snackbar>
    </div>
  )
}
