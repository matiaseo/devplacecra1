import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { UserContextProvider, useUserContext } from '../Login';
import { ProductCard } from './ProductCard';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))
jest.mock('../Login', () => ({ useUserRole: () => ({ role: '' }) }))

describe('When rendering ProductCard', () => {
  describe('Without props', () => {
    test('Renders an empty card', () => {
      render(<ProductCard />)
      expect(screen.getByTestId('product-card-missing-props')).toBeInTheDocument()
    })
  })
  describe('With props', () => {
    const basicProps = {
      name: 'product name',
      price: 1,
      stock: 2,
      categoryName: 'category name'
    }
    test('Renders card with received details', () => {
      render(<ProductCard {...basicProps} />)
      const component = screen.getByTestId('ProductCard')
      expect(component).toHaveTextContent(basicProps.name)
      expect(component).toHaveTextContent(basicProps.price)
      expect(component).toHaveTextContent(basicProps.stock)
      expect(component).toHaveTextContent(basicProps.categoryName)
    })
    describe('Without id', () => {
      test('Renders card without details button', () => {
        mockNavigate.mockReturnValue('asdasdklkk.fsddsfsd.sdf')
        render(<ProductCard {...basicProps}/>)
        const component = screen.getByTestId('ProductCard')
        expect(component).not.toHaveTextContent('View Details')
        expect(mockNavigate).toHaveBeenCalledTimes(0)
      })
    })
    // describe('With id', () => {
    //   test('Renders card with details button', () => {
    //     render(<ProductCard />)
    //     expect(screen.getByLabelText())
    //   })
    // })
    // describe('Without admin role', () => {
    //   test('Renders card without details button', () => {
    //     render(<ProductCard />)
    //     expect(screen.getByLabelText())
    //   })
    // })
    // describe('With admin role', () => {
    //   test('Renders card with details button', () => {
    //     render(<ProductCard />)
    //     expect(screen.getByLabelText())
    //   })
    // })
  })
})