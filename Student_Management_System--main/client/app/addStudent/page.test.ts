import React from 'react';
import { render, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import AddStudent from './page'; // Import your component

describe('AddStudent component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<AddStudent />);
  });

  it('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  it('displays the "Add Student" heading', () => {
    const { getByText } = component;
    expect(getByText('Add Student')).toBeInTheDocument();
  });

  // Add more tests here to cover different functionalities of your component
});
