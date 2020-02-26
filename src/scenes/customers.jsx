import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

import Spinner from '../components/common/spinner';
import CustomerTable from '../components/customertable';
import { getCustomers, deleteCustomer } from '../services/customerService';

class Customers extends Component {
  state = {
    customers: [],
    sortColumn: { path: 'name', order: 'asc' },
    loading: true
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();

    this.setState({
      customers,
      loading: false
    });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;

    this.setState(state => ({
      customers: state.customers.filter(c => c._id !== customer._id)
    }));

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Customer has already been deleted');
      }

      this.setState(state => ({ customers: originalCustomers }));
    }
  };

  handleSort = (sortColumn) => this.setState(state => ({ sortColumn }));

  getSortedCustomers() {
    const { customers, sortColumn } = this.state;
    return _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
  }

  render() {
    const { user } = this.props;
    const { sortColumn, loading } = this.state;
    const customers = this.getSortedCustomers();

    if (loading) return <Spinner />;

    return (
      <>
        <h2>Customers</h2>
        <div className="col">
          <p className="align-middle">
            {customers.length} total Customers.
            { (user && user.isAdmin) && (
                <Link to="/customers/new" className="float-right">
                  <button className="btn btn-primary mb-4">
                    Add Customer
                  </button>
                </Link>
              )
            }
            { (!user || !user.isAdmin) && (
                <button className="btn btn-primary mb-4 disabled float-right">
                  Add Customer
                </button>
              )
            }
          </p>
          <CustomerTable
            user={user}
            customers={customers}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
        </div>
      </>
    );
  }
}

export default Customers;
