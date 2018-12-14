import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {

    // address:
    //     city: "Petaling Jaya"
    //     country_code: "MY"
    //     line1: "Level 01, No 1, First Avenue Bandar Utama"
    //     postal_code: "47800"
    //     recipient_name: "test buyer"
    //     state: "Selangor"
    // cancelled: false
    // email: "wongkokwah-buyer@gmail.com"
    // paid: true
    // payerID: "EE22QL9JG9ZJA"
    // paymentID: "PAY-0F098273BS0171721LQJ4PMQ"
    // paymentToken: "EC-39N997400V460890X"
    // returnUrl: "https://www.sandbox.paypal.com/?paymentId=PAY-0F098273BS0171721LQJ4PMQ&token=EC-39N997400V460890X&PayerID=EE22QL9JG9ZJA"
    render() {
        let env = 'sandbox';
        let currency = 'MYR';
        let total = this.props.toPay;

        const onSuccess = (payment) => {
            console.log(JSON.stringify(payment))
            this.props.onSuccess(payment)
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data))

        }

        const onError = (err) => {
            console.log(JSON.stringify(err))

        }

        const client = {
            sandbox: 'ATmzZso-E1mazblfcCkXDdakdUFs-RCgl8zR2LkKx6lINsVtrok0ojlB-tC475Fse2U5KSaoUDZKojQr',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onCancel={onCancel}
                    onSuccess={onSuccess}
                    style={{
                        size: 'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        );
    }
}

export default Paypal;