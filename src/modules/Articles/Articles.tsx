import Service from 'Service/Service';
import List from 'List/List';

export default function(props) {
    const serv = new Service({endpoint: 'List'});
    const items = [{id: 1, title: 'first'}, {id: 2, title: 'second'}];
    
    const ArticleListItem = ({item}) => {
        return <section>Article</section>
    }

    return <List source={serv} items={items} itemTemplate={ArticleListItem}/>
           
}