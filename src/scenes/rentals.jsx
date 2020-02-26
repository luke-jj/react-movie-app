import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getRentals, returnRental } from '../services/rentalService';
import RentalTable from '../components/rentaltable';
import Spinner from '../components/common/spinner';


class Rentals extends Component {
  state = {
    rentals: [],
    sortColumn: { path: 'name', order: 'asc' },
    loading: true
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();

    this.setState({
      rentals,
      loading: false
    });
  }

  handleSort = (sortColumn) => this.setState(state => ({ sortColumn }));

  handleReturn = async (rental) => {
    const originalRentals = this.state.rentals;

    this.setState(state => ({
      rentals: state.rentals.filter(r => r._id !== rental._id)
    }));

    try {
      const { data } = await returnRental(rental);

      this.setState(state => ({
        rentals: _.cloneDeep(state.rentals).push(data)
      }));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error('Rental already processed.');
      }

      this.setState(state => ({ originalRentals }));
    }
  };

  getSortedRentals() {
    const { rentals, sortColumn } = this.state;
    return _.orderBy(rentals, [sortColumn.path], [sortColumn.order]);
  }

  getOpenRentalsCount() {
    let count = 0;
    this.state.rentals.forEach(rental => !rental.dateReturned && count++);
    return count;
  }

  render() {
    const { loading, sortColumn } = this.state;
    const { user } = this.props;

    const rentals = this.getSortedRentals();

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <h2>Rentals</h2>
        <div>
          <p className="align-middle">
            {this.getOpenRentalsCount()} total open rentals.
            { (user && user.isAdmin) ? (
              <Link to="/rentals/new" className="float-right">
                <button className="btn btn-primary mb-4">
                  New Rental
                </button>
              </Link>
            ) : (
              <button className="btn btn-primary mb-4 disabled float-right">
                New Rental
              </button>
            )}
          </p>
          <RentalTable
            user={user}
            rentals={rentals}
            sortColumn={sortColumn}
            onReturn={this.handleReturn}
            onSort={this.handleSort}
          />
        </div>
      </Fragment>
    );
  }
}

export default Rentals;
