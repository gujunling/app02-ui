import React from 'react';
import axios from '../utils/axios';
import{Table,Button,Icon,message} from 'antd';
//组件类，任何页面都可以理解为是一个组件
class CoursePage extends React.Component{
       //构造函数
    constructor(){
        super();
        this.state={
            msg:"hello course",
            list:[]
        }
    }
    //生命周期函数，组件绑定时执行
    componentDidMount(){
        //查询数据，进行数据绑定
       this.handleLoad();
    }
    handleLoad(){
        axios.get("/course/findAll")
        .then((result) => {
           // console.log('查询到的数据为：',result.data);
           //将查询到的数据设置到state中
           this.setState({
               list:result.data     //查询结果复制给list
           })
        })
    }
    //点击删除按钮时的处理函数
    handleDelete(id){
        alert(id);
        axios.get("/course/deleteById?id="+id)
        .then((result) =>{
              //提示
        message.success(result.statusText);
        //页面刷新(数据)
        this.handleLoad();
        })
    }
    //渲染函数
    render(){
        let columns = [{
            title:"编号",
            dataIndex:"id"
        },{
            title:"课程名",
            dataIndex:"name"
        },{
            title:"简介",
            dataIndex:"description"
        },{
            title:"学分",
            dataIndex:"credit"
        },{
            title:"教师ID",
            dataIndex:"teacher_id"
        },{
            title:"操作",
           render:(text,record)=>{
               return(
                   <div>
                       <Icon type="delete" onClick={this.handleDelete.bind(this,record.id)}></Icon>
                       &nbsp;&nbsp;
                       <Icon type="edit"></Icon>
                   </div>
               )
           }
        }]
 
return(
    <div>
        <h2>课程管理</h2>
        <div>
                    <Button type="primary">添加</Button> &nbsp;
                    <Button type="danger">批量删除</Button>
                </div>

                <Table size="small" rowKey="id" dataSource={this.state.list} columns={columns}/>
                
    </div>
)
    }
}
//暴露接口
export default CoursePage;