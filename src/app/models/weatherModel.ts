export interface WeatherModel {
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
    };
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
    };
    forecast: {
      forecastday: {
        date: string;
        day: {
          avgtemp_c: number;
          condition: {
            icon: string;
            text: string;
          }
        }
        hour: {
          temp_c: number;
          condition:{
            icon: string;
            text: string;
          }
        }
      }[]
    };
  }