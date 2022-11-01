import { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL: string = 'https://date.nager.at/api/v3/PublicHolidays/2023/RS'

interface Holiday {
  id: number
  name: String
  date: Date
}

function App(): JSX.Element {

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  async function loadHolidays (): Promise<void>{
    const response: Response = await fetch(API_URL);
    const responseJson: any = await response.json();
    const newHolidays: Holiday[] = responseJson.map((r: any, i:number) =>
    ({id: i, name: r['name'], date: new Date(r['date'])}));

    setHolidays(() => newHolidays);
    console.info('Loaded');
  }

  useEffect(function():void{
    void loadHolidays();
  }, [])


  return (
    <Fragment>
      <h1>Holidays</h1>
      <ul>
        {holidays.map((h) =>
            <li key={h.id}><strong>{h.name}</strong> | {h.date.toLocaleDateString()}</li>)}
      </ul>
    </Fragment>
  );
}

export default App;
