import React from 'react';
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends React.Component {
    state = {
        text: ''
    }

    handleChange = (e) => {
        const text = e.target.value

        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { text } = this.state;
        const { dispatch, id } = this.props;

        dispatch(handleAddTweet(text, id));
    }

    render() {
        const { text } = this.state;
        const tweetLeft = 240 - text.length;

        return (
            <div>
                <h3 className='center'>New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        className='textarea'
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        maxLength={280}
                    />
                    {tweetLeft < 100 && (
                        <div className='tweet-length'>tweetLeft</div>
                    )}

                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        );

    }
}

export default connect()(NewTweet);