import { Box, Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import React from "react"

interface propType {
  label?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const TaskItemBtn: React.FC<propType> = ({
  label = "",
  children,
  onClick,
}: propType) => {
  const data = label

  return (
    <Box display="block">
      <Box display="flex" justifyContent="center">
        <IconButton aria-label={label} onClick={onClick}>
          {children}
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="body2" color="textSecondary">
          {data}
        </Typography>
      </Box>
    </Box>
  )
}
