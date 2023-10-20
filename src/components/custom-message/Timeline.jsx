import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Checkbox,
    Grid
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs, { Dayjs } from 'dayjs';

const defaultResults = {
    startDate: new Date(),
    endDate: null,
    recurrence: {
        type: 'daily', // Default recurrence type
        recurrenceTime: '',
        dailyFrequency: 1,
        weeklyDays: [],
        monthlyDay: '',
        monthlyFrequency: '',
        monthlyWeekday: '',
        customDateTimes: [],
    },
};

const Timeline = ({ results = defaultResults }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(results.startDate);
    const [selectedEndDate, setSelectedEndDate] = useState(results.endDate);
    const [selectedRecurrenceType, setSelectedRecurrenceType] = useState(results.recurrence.type);
    const [isReccurance, setReccurance] = useState(false);

    const handleRecurranceChange = (event) => {
        setReccurance(event.target.checked);
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    const handleRecurrenceTypeChange = (event) => {
        setSelectedRecurrenceType(event.target.value);
    };

    return (
        <Container>
            <Typography variant="h5">Timeline</Typography>
            <Box display="flex" flexDirection="column" sx={{
                marginTop: "1.5rem"
            }}>
                <Grid container spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xs={6}>
                            <DatePicker
                                slotProps={{
                                    textField: {
                                        sx: { minWidth: '50%' },
                                        variant: 'standard',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                slotProps={{
                                    textField: {
                                        sx: { minWidth: '50%' },
                                        variant: 'standard',
                                    },
                                }}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                <br></br>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl component="fieldset">
                            <FormControlLabel control={<Checkbox checked={isReccurance}
                                onChange={handleRecurranceChange}
                                inputProps={{ 'aria-label': 'controlled' }} />} label="Recurrence" />
                            {
                                isReccurance ? (
                                    <RadioGroup
                                        row
                                        name="recurrenceType"
                                        value={selectedRecurrenceType}
                                        onChange={handleRecurrenceTypeChange}
                                    >
                                        <FormControlLabel
                                            value="daily"
                                            control={<Radio />}
                                            label="Daily"
                                        />
                                        <FormControlLabel
                                            value="weekly"
                                            control={<Radio />}
                                            label="Weekly"
                                        />
                                        <FormControlLabel
                                            value="monthly"
                                            control={<Radio />}
                                            label="Monthly"
                                        />
                                    </RadioGroup>
                                ) : ""


                            }

                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {
                            isReccurance ? (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid item xs={6}>
                                        <StaticTimePicker defaultValue={dayjs()} />
                                    </Grid>
                                </LocalizationProvider>
                            ) : ""
                        }
                    </Grid>

                </Grid>
                {/* {selectedRecurrenceType === 'daily' && (
            // Render controls for daily recurrence
          )}
          {selectedRecurrenceType === 'weekly' && (
            // Render controls for weekly recurrence
          )}
          {selectedRecurrenceType === 'monthly' && (
            // Render controls for monthly recurrence
          )} */}
            </Box>
            <br></br>
        </Container>
    );
};

export default Timeline;
