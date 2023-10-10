import React, { useEffect, useMemo  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchTasks} from "../redux/taskSlice";
import { MaterialReactTable } from 'material-react-table';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Report = () => {
    const columns = useMemo(
        () => [
          {
            accessorKey: 'jobId',
            header: 'Job ID',
            // All of the options you can specify here
          },
          {
            accessorKey: 'type',
            header: 'Channel Type',
            // All of the options you can specify here
          },
          {
            accessorFn: (row) => new Date(row.created_at), //convert to Date for sorting and filtering
            id: 'created_at',
            header: 'Created Date',
            filterFn: 'lessThanOrEqualTo',

            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            //Custom Date Picker Filter from @mui/x-date-pickers
            Filter: ({ column }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newValue) => {
                    column.setFilterValue(newValue);
                  }}
                  slotProps={{
                    textField: {
                      helperText: 'Filter Mode: Less Than',
                      sx: { minWidth: '120px' },
                      variant: 'standard',
                    },
                  }}
                  value={column.getFilterValue()}
                />
              </LocalizationProvider>
            ),
          },
          {
            accessorFn: (row) => new Date(row.updated_at), //convert to Date for sorting and filtering
            id: 'updated_at',
            header: 'Updated Date',
            filterFn: 'lessThanOrEqualTo',

            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            //Custom Date Picker Filter from @mui/x-date-pickers
            Filter: ({ column }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newValue) => {
                    column.setFilterValue(newValue);
                  }}
                  slotProps={{
                    textField: {
                      helperText: 'Filter Mode: Less Than',
                      sx: { minWidth: '120px' },
                      variant: 'standard',
                    },
                  }}
                  value={column.getFilterValue()}
                />
              </LocalizationProvider>
            ),
          },
        ],
        [],
      );
    const dispatch = useDispatch();
    const { status, tasks, error } = useSelector((state)=> state.task);
  
    useEffect(() => {
      // Dispatch the fetchTasks action when the component mounts
      dispatch(fetchTasks());
    }, [dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }



return(
    <MaterialReactTable
      columns={columns}
      data={tasks}
      enableColumnFilterModes
      enableColumnOrdering
      initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"/>
)
}

export default Report