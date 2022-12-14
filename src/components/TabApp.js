import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './customers/Customerlist'
import Traininglist from './trainings/Traininglist';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import Calendarpage from '../Calendarpage';
import Chartpage from './Chartpage';


export default function TabApp() {
    
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab value='one' label="Home" icon={<HomeRoundedIcon fontSize='small'/>} />
          <Tab value='two'  label="Customers" icon={<GroupRoundedIcon fontSize='small'/>} />
          <Tab value='three' label="Training Info" icon={<FitnessCenterRoundedIcon fontSize='small' />} />
          <Tab value='four' label="Calendar" icon={<CalendarMonthRoundedIcon fontSize='small' />} />
          <Tab value='five' label="Statistics" icon={<InsertChartRoundedIcon fontSize='small' />} />
        </Tabs>
      </Box>
      {value === 'one' &&
      <div className="hometext">
                <h1>Welcome to the home page!</h1>
                <h3>This is the final assignment of the Front End programming course </h3>
                <h3>Check out "Customers", "Training Info", "Calendar" & "Statistics" pages</h3>
      </div>}
          {value === 'two' && <div><Customerlist /></div>}
          {value === 'three' && <div><Traininglist/></div>}
          {value === 'four' && <div><Calendarpage/></div>}
          {value === 'five' && <div><Chartpage/></div>}
    </div>
  )
}