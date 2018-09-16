import Button from '@material-ui/core/Button';
import * as React from 'react';
import SearchInput from 'react-search-input';


export default class App extends React.Component<{}, { searchTerm: string, bookTitle: string[], bookAuthor: string[] } > {
  constructor (props:any) {
    super(props)
    this.state = {
      searchTerm: '',
      bookTitle: ['Please enter a book name to search'],
      bookAuthor: ['']
    }
    this.searchTermUpdated = this.searchTermUpdated.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  public render () {
    const bookTitleResults = this.state.bookTitle;
    const bookAuthorResults = this.state.bookAuthor;

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchTermUpdated} onKeyPress={this.handleKeyPress}/>
        
        <Button onClick={this.sendRequest} color="primary" variant="outlined">
          Search Books
        </Button>
        <ul>
          {bookTitleResults.map((book, index) => {
            const author = bookAuthorResults[index];
            return (
              <div className="books" key={book+author}>
                <div className="title">{book}</div>
                <div className="author">{author}</div>
                <div>******************************************************************************************</div>
              </div>
            )
          })
          } 
        </ul>
      </div>  
    );
  }

  public searchTermUpdated (term:any) {
    this.setState({searchTerm: term})
    
  }

  public handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      this.sendRequest();
    }
  }

  public sendRequest()  {
    const searchterm: string = this.state.searchTerm;
    this.setState({bookTitle: [''], bookAuthor: ['']});
    if (searchterm !== "") {
      
      const url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchterm;
      fetch(url)
      .then((response) => {        
        return response.json();
      }
      )
      .then((json) => {        
        const titleContent:any  = [];
        const authorContent:any = [];

                    
                    for (const item of json.items) {
                      titleContent.push("Title: " + item.volumeInfo.title);
                      authorContent.push("Author: " + item.volumeInfo.authors[0]);
                    }    
                                  
                    this.setState({bookTitle: titleContent, bookAuthor: authorContent});
      })
      .catch((error) => {   
        this.setState({bookTitle: ["No search results found"], bookAuthor: ['']});
      })
     
      
    } else {
        this.setState({bookTitle: ["Please enter a search term"], bookAuthor: ['']});
    } 
}

}
