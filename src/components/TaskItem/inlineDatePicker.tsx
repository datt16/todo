import "date-fns"
import React from "react"
import Box from "@material-ui/core/Box"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { TaskItemBtn } from "./taskItemButton"
import ForwardIcon from "@material-ui/icons/ArrowForward"
import BackIcon from "@material-ui/icons/ArrowBack"

interface PropType {
  backCB: () => void
  forwardCB: (value: Date | null) => void
  value: Date | null
}

export const InlineDatePicker: React.FC<PropType> = ({
  backCB,
  forwardCB,
  value = null,
}: PropType) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    value == null ? new Date() : value
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box display="flex">
        <Box ml={1}>
          <TaskItemBtn label="戻る" onClick={backCB}>
            <BackIcon />
          </TaskItemBtn>
        </Box>
        <Box ml={1}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Box>
        <Box ml={1}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Box>
        <Box ml={1}>
          <TaskItemBtn label="保存" onClick={() => forwardCB(selectedDate)}>
            <ForwardIcon />
          </TaskItemBtn>
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  )
}
