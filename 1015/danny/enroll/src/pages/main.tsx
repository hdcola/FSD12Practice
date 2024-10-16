import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useQuery } from '@tanstack/react-query';
import firebase from 'firebase/compat/app';

interface Schedule {
  id: string;
  title: string;
  date: firebase.firestore.Timestamp;
  startTime: string;
  endTime: string;
  maxStudents: number;
  teacherID: string;
}

export const Main = () => {
  const schedulesRef = collection(db, 'schedules');
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const getSchedules = async () => {
    const data = await getDocs(schedulesRef);
    const schedules = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Schedule[];
    return schedules;
  };

  const {
    isPending,
    error,
    data: scheduleList,
    isFetching,
  } = useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <div>
        {scheduleList?.map((schedule) => (
          <div key={schedule.id}>
            <h2>{schedule.title}</h2>
            <p>{formattedDate.format(schedule.date.toDate())}</p>
            <p>
              {schedule.startTime} - {schedule.endTime}
            </p>
            <p>Max Students: {schedule.maxStudents}</p>
          </div>
        ))}
      </div>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
};
