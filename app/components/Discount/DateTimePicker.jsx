import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DatePicker, TextField, Icon, Popover, InlineGrid, ResourceList } from '@shopify/polaris';
import { CalendarIcon, ClockIcon } from '@shopify/polaris-icons';

const toInt  = time => ((h,m) => h*2 + m/30)(...time.split(':').map(parseFloat)),
    range  = (from, to) => Array(to-from+1).fill().map((_,i) => from + i),
    eachHalfHour = (t1, t2) => range(...[t1, t2].map(toInt)).map(toTime);

const toTime = int => {
  const hours = Math.floor(int / 2);
  const minutes = int % 2 ? '30' : '00';

  // Determine AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Pad the hours with leading zero if needed
  const paddedHours = formattedHours < 10 ? `0${formattedHours}` : `${formattedHours}`;

  return `${paddedHours}:${minutes} ${period}`;
};

const timezoneOffsetDate = d => {
  const offset = new Date().getTimezoneOffset();
  const date = new Date(d.getTime() - (offset*60*1000));
  return date;
};

export const getDateString = d => {
  const date = timezoneOffsetDate(d);
  return date.toISOString().split('T')[0];
};

export const getTimeString = d => {
  const date = timezoneOffsetDate(d);
  const dateSplit = date.toISOString().split('T')[1].split(":");
  let hours = parseInt(dateSplit[0]);
  let minutes = parseInt(dateSplit[1]);

  // Determine AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Pad the hours with leading zero if needed
  const paddedHours = formattedHours < 10 ? `0${formattedHours}` : `${formattedHours}`;

  return `${paddedHours}:${dateSplit[1]} ${period}`;
};

const today = new Date();

const currentTimeString = getTimeString(new Date(Date.now()));
const timeList = [currentTimeString, ...eachHalfHour("00:00", "23:30")];

function DateTimePicker({ initialValue=Date.now(), dateLabel="Date", timeLabel="Time", onChange=() => {} }) {
  const isInitialMount = useRef(true);

  const [{month, year}, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [datePopoverActive, setDatePopoverActive] = useState(false);
  const [timePopoverActive, setTimePopoverActive] = useState(false);
  const [selectedDates, setSelectedDates] = useState(
    initialValue ? { start: new Date(initialValue), end: new Date(initialValue) } : { start: new Date(), end: new Date() }
  );
  const [selectedTime, setSelectedTime] = useState(initialValue ? getTimeString(new Date(initialValue)) : "");

  const dateString = getDateString(selectedDates.start);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (selectedTime && selectedDates.start) {
      const newDate = new Date(`${getDateString(selectedDates.start)} ${selectedTime}`)
      onChange(newDate.toISOString());
    }
  }, [selectedDates, selectedTime])
  
  const onDateChange = useCallback((v) => {
    setSelectedDates(v);
    setDatePopoverActive(false);
  }, []);

  const onTimeSelect = useCallback((v) => {
    setSelectedTime(v);
    setTimePopoverActive(false);
  }, []);

  const toggleDatePopoverActive = useCallback(
    () => setDatePopoverActive(v => !v),
    [],
  );

  const toggleTimePopoverActive = useCallback(
    () => setTimePopoverActive(v => !v),
    [],
  );

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  const dateActivator = (
    <TextField
      label={dateLabel}
      value={dateString}
      prefix={<Icon source={CalendarIcon} />}
      onFocus={toggleDatePopoverActive} />
  );

  const timeActivator = (
    <TextField
      label={timeLabel}
      value={selectedTime}
      prefix={<Icon source={ClockIcon} />}
      onFocus={toggleTimePopoverActive} />
  );

  return (
    <InlineGrid gap={300} columns={2}>
      <Popover
        preferredPosition="above"
        active={datePopoverActive}
        activator={dateActivator}
        onClose={toggleDatePopoverActive}>
        <div style={{padding: '16px'}}>
          <DatePicker
            month={month}
            year={year}
            onChange={onDateChange}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
          />
        </div>
      </Popover>
      <Popover
        preferredPosition="above"
        active={timePopoverActive}
        activator={timeActivator}
        onClose={toggleTimePopoverActive}>
        <div style={{minWidth: '120px'}}>
          <ResourceList items={timeList} renderItem={time => (
            <ResourceList.Item id={time} onClick={onTimeSelect}>
              {time}
            </ResourceList.Item>
          )} />
        </div>
      </Popover>
    </InlineGrid>
  )
}

export default DateTimePicker;