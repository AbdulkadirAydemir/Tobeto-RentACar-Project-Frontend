import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarCard from '../components/carCard/CarCard';
import { Col, Container, Row } from 'react-bootstrap';
import Teams from '../components/teams/Teams';
import carService from '../services/carService';
import { GetAllCarResponse } from '../models/responses/Car/getAllCarResponse';
import { setCars } from '../store/car/carSlice';
import Layout from '../components/layout/Layout';
import Banner from '../components/banner/Banner';

type Props = {};

const HomePage = (props: Props) => {
  const dispatch = useDispatch();
  const cars = useSelector((state: any) => state.car.cars);
  useEffect(() => {
    getCars();
  }, []);
  const getCars = () => {
    carService.getAll().then((response) => {
      console.log(response.data);

      dispatch(setCars(response.data));
    });
  };

  console.log(cars);

  return (
    <Layout>
      <Banner/>
      <Container>
        <Row>
          {cars.map((car: GetAllCarResponse, i: number) => (
            <Col key={i} className="col-4">
              <CarCard car={car} />
            </Col>
          ))}
        </Row>
      </Container>
      <Teams />
    </Layout>
  );
};

export default HomePage;
