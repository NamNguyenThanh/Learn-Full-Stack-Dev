import React from 'react';
import MainLayout from '../../layouts/MainLayout';

const category = [
  {
    id: 1,
    icon: '',
    title: 'Vợt Cầu Lông',
    subCategory: [],
  },
];

export default function Home() {
  return (
    <MainLayout>
      <section className="home-slider">
        <div className="category"></div>
        <div className="slider"></div>
      </section>
    </MainLayout>
  );
}
