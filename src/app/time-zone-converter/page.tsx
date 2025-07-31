'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';
import Loading from '@/components/ui/Loading';
import { Clock, Globe } from 'lucide-react';

const timeZoneSchema = z.object({
  sourceTime: z.string().min(1, 'Time is required'),
  sourceDate: z.string().min(1, 'Date is required'),
  sourceTimeZone: z.string().min(1, 'Source timezone is required'),
  targetTimeZones: z.array(z.string()).min(1, 'At least one target timezone is required'),
});

type TimeZoneFormData = z.infer<typeof timeZoneSchema>;

interface ConvertedTime {
  timeZone: string;
  time: string;
  date: string;
  offset: string;
  isDST: boolean;
}

const TimeZoneConverter = () => {
  const [results, setResults] = useState<ConvertedTime[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TimeZoneFormData>({
    resolver: zodResolver(timeZoneSchema),
    defaultValues: {
      sourceTime: '',
      sourceDate: '',
      sourceTimeZone: 'America/New_York',
      targetTimeZones: ['Europe/London', 'Asia/Tokyo'],
    },
  });

  // Popular time zones
  const timeZones = [
    { value: 'America/New_York', label: 'New York (EST/EDT)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  ];

  // Update current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set current time as default
  useEffect(() => {
    const now = new Date();
    setValue('sourceDate', now.toISOString().split('T')[0]);
    setValue('sourceTime', now.toTimeString().slice(0, 5));
  }, [setValue]);

  const convertTimeZones = async (data: TimeZoneFormData) => {
    setIsConverting(true);
    
    try {
      const sourceDateTime = new Date(`${data.sourceDate}T${data.sourceTime}`);
      
      // Create a date in the source timezone
      const sourceDate = new Date(sourceDateTime.toLocaleString('en-US', { timeZone: data.sourceTimeZone }));
      const localDate = new Date(sourceDateTime.toLocaleString());
      const offset = localDate.getTime() - sourceDate.getTime();
      const utcTime = new Date(sourceDateTime.getTime() + offset);

      const convertedTimes: ConvertedTime[] = data.targetTimeZones.map(timeZone => {
        const targetDate = new Date(utcTime.toLocaleString('en-US', { timeZone }));
        
        // Format time and date
        const time = targetDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone,
        });
        
        const date = targetDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone,
        });

        // Get timezone offset
        const offsetMinutes = targetDate.getTimezoneOffset();
        const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
        const offsetMins = Math.abs(offsetMinutes) % 60;
        const offsetSign = offsetMinutes <= 0 ? '+' : '-';
        const offsetString = `UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;

        // Check if DST (simplified check)
        const jan = new Date(targetDate.getFullYear(), 0, 1);
        const jul = new Date(targetDate.getFullYear(), 6, 1);
        const janOffset = jan.getTimezoneOffset();
        const julOffset = jul.getTimezoneOffset();
        const isDST = Math.min(janOffset, julOffset) === targetDate.getTimezoneOffset();

        return {
          timeZone,
          time,
          date,
          offset: offsetString,
          isDST,
        };
      });

      setResults(convertedTimes);
    } catch (error) {
      console.error('Error converting time zones:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const onSubmit = (data: TimeZoneFormData) => {
    convertTimeZones(data);
  };

  const useCurrentTime = () => {
    const now = new Date();
    setValue('sourceDate', now.toISOString().split('T')[0]);
    setValue('sourceTime', now.toTimeString().slice(0, 5));
  };

  const relatedTools = [
    {
      name: 'Age Calculator',
      href: '/age-calculator',
      description: 'Calculate exact age and time differences',
    },
    {
      name: 'Date Calculator',
      href: '/date-calculator',
      description: 'Calculate differences between dates',
    },
    {
      name: 'Countdown Timer',
      href: '/countdown-timer',
      description: 'Create countdown timers',
    },
  ];

  return (
    <ToolLayout
      title="Time Zone Converter - World Clock & Meeting Scheduler"
      description="Free time zone converter for global meetings, travel planning & world clock. Convert time between time zones with daylight saving time support for scheduling across countries."
      slug="time-zone-converter"
      keywords={['time zone converter', 'world clock', 'meeting scheduler', 'global time converter', 'timezone calculator', 'international time', 'DST converter']}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Time Zone Converter</h1>
          <p className="text-lg text-gray-600">
            Convert time between different time zones worldwide. Perfect for scheduling meetings, 
            planning travel, or coordinating with global teams.
          </p>
        </div>

        {/* Current Time Display */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Current Local Time</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{currentTime}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Converter Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField 
                  label="Date" 
                  required
                  error={errors.sourceDate}
                >
                  <Input
                    type="date"
                    {...register('sourceDate')}
                    error={!!errors.sourceDate}
                  />
                </FormField>

                <FormField 
                  label="Time" 
                  required
                  error={errors.sourceTime}
                >
                  <Input
                    type="time"
                    {...register('sourceTime')}
                    error={!!errors.sourceTime}
                  />
                </FormField>
              </div>

              <FormField 
                label="Source Time Zone" 
                required
                error={errors.sourceTimeZone}
              >
                <Select
                  {...register('sourceTimeZone')}
                  error={!!errors.sourceTimeZone}
                  options={timeZones}
                />
              </FormField>

              <FormField 
                label="Convert To" 
                required
                description="Select time zones to convert to"
              >
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3 bg-white">
                  {timeZones.map((tz) => (
                    <label key={tz.value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={tz.value}
                        {...register('targetTimeZones')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tz.label}</span>
                    </label>
                  ))}
                </div>
              </FormField>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={useCurrentTime}
                  className="flex items-center space-x-1"
                >
                  <Clock className="h-4 w-4" />
                  <span>Use Current Time</span>
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={isConverting}
                  className="flex-1"
                >
                  {isConverting ? <Loading size="sm" text="Converting..." /> : 'Convert Time Zones'}
                </Button>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Converted Times</h3>
                {results.map((result, index) => (
                  <div key={index} className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {timeZones.find(tz => tz.value === result.timeZone)?.label || result.timeZone}
                      </h4>
                      <span className="text-xs text-gray-500">{result.offset}</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {result.time}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.date}
                    </div>
                    {result.isDST && (
                      <div className="text-xs text-orange-600 mt-1">
                        Daylight Saving Time
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select time zones and convert to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Time Zone Conversion</h2>
          <p className="text-gray-600 mb-4">
            Time zones are regions of the Earth that have the same standard time. This tool helps you 
            convert time between different time zones, accounting for daylight saving time changes.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Business Meetings</h4>
              <p className="text-blue-700">Schedule meetings across different time zones</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Travel Planning</h4>
              <p className="text-green-700">Plan flights and activities in different time zones</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900">Global Teams</h4>
              <p className="text-yellow-700">Coordinate with team members worldwide</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Event Planning</h4>
              <p className="text-purple-700">Schedule global events and webinars</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Zone Facts</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <strong>UTC:</strong> Coordinated Universal Time is the primary time standard
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>DST:</strong> Daylight Saving Time shifts clocks forward in summer
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <strong>Offset:</strong> Time zones are expressed as offsets from UTC (e.g., UTC+5)
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">How accurate is this time zone converter?</h4>
              <p className="text-gray-600">
                This converter uses the browser's built-in time zone database, which is regularly updated 
                and accounts for daylight saving time changes and historical time zone data.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Does it account for daylight saving time?</h4>
              <p className="text-gray-600">
                Yes, the converter automatically accounts for daylight saving time (DST) changes 
                based on the date and time zones selected.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">What if a time zone isn't listed?</h4>
              <p className="text-gray-600">
                We've included the most commonly used time zones. For specific regions not listed, 
                you can use the closest major city in the same time zone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimeZoneConverter;
