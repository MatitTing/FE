import styled from '@emotion/styled';
import { Color } from 'styles/Color';
import { PartyCard } from './PartyCard';

export interface PartyListDataType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxPeople: number;
  isWomenOnly: boolean;
  image: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Color.VeryLightGrey};
  padding: 50px;
  overflow: scroll;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

export const HomeList = () => {
  const partyData = [
    {
      id: '1',
      title: 'party1',
      description: 'party1 description',
      date: '2022-01-01',
      time: '12:00',
      location: 'party1 location',
      maxPeople: 10,
      isWomenOnly: true,
      image:
        'https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_1280.jpg',
    },
    {
      id: '2',
      title: 'party2',
      description: 'party2 description',
      date: '2022-01-03',
      time: '12:00',
      location: 'party1 location',
      maxPeople: 10,
      isWomenOnly: false,
      image:
        'https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg',
    },
    {
      id: '3',
      title: 'party3',
      description: 'party3 description',
      date: '2022-01-02',
      time: '12:00',
      location: 'party1 location',
      maxPeople: 10,
      isWomenOnly: false,
      image:
        'https://cdn.pixabay.com/photo/2021/12/27/16/40/sylvester-6897648_1280.jpg',
    },
  ];
  return (
    <Container>
      {partyData.map((party) => (
        <PartyCard key={party.id} partyData={party} />
      ))}
    </Container>
  );
};
