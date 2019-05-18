import * as moment from 'moment';

export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Thunderstorm'
  // Atmospheric conditions
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Dust'
  | 'Ash'
  | 'Squall'
  | 'Tornado';

export interface CurrentWeatherResponseContract {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  rain: {
    '1h': number;
    '3h': number;
  };
  snow: {
    '1h': number;
    '3h': number;
  };
  dt: number;
}

export interface CurrentWeatherContract {
  atmosphere: {
    condition: WeatherCondition;
    pressure: number;
    humidity: number;
  };
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  cloudiness: number;
  rain: {
    lastHour: number;
    lastthreeHours: number;
  };
  snow: {
    lastHour: number;
    lastthreeHours: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dateTime: moment.Moment;
}
