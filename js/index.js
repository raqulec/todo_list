class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: [],
            bgColor: [
                '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#73A857"
            ],
            selectedColor: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitMessages = this.submitMessages.bind(this);
        this.deleteMessages = this.deleteMessages.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessages() {
        if (this.state.input != '') {
            this.setState({
                input: '',
                messages: this.state.messages.concat(this.state.input)
            });
        }
    }
    deleteMessages() {
        var array = [...this.state.messages];
        var index = array.indexOf(this.state.messages)
        array.splice(index, 1);
        this.setState({
            messages: array
        });
    }
    componentDidMount() {
        document.body.classList.add("background-orange");
    }
    componentWillUnmount() {
        document.body.classList.remove("background-orange");
    }
    getRandomColor() {
        var item = this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];
        this.setState({
            selectedColor: item
        })
    }

    render() {
        document.body.style.backgroundColor = this.state.selectedColor;
        const tasks = this.state.messages.map((msg, idx) => {
            return (
                <li key={idx}>
                    <input type="checkbox" name={this.state.messages.length} id={idx} />
                    <label id="tasks" for={idx}>{msg}</label>
                </li>
            )
        })
        return (
            <div>
                <h2 id="header">To-Do List</h2>
                <label>Things to do: <span class="badge badge-primary badge-pill">{this.state.messages.length}</span></label>
                <div class="input-group">
                    <input id="input" type="text" class="form-control" placeholder="tap in things to do..."
                        value={this.state.input}
                        onChange={this.handleChange} />
                    <div class="input-group-append">
                        <button type="button" class="btn btn-success" onClick={(event) => { this.submitMessages(); this.getRandomColor(); }}>SUBMIT</button>
                        <button type="button" class="btn btn-danger" onClick={(event) => { this.deleteMessages(); this.getRandomColor(); }}>DELETE</button>
                    </div>
                </div>
                <ul>
                    {tasks}
                </ul>

            </div>
        );
    }
};
ReactDOM.render(<Presentational />, document.getElementById('app'));