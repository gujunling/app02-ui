import React from 'react';
import axios from '../utils/axios';
import{Table,Button,Icon,message} from 'antd';
//组件类，任何页面都可以理解为是一个组件
class StudentCoursePage extends React.Component{
       //构造函数
    constructor(){
        super();
        this.state={
            msg:"hello studentcourse",
            list:[]
        }
    }
    //生命周期函数，组件绑定时执行
    componentDidMount(){
        //查询数据，进行数据绑定
       this.handleLoad();
    }
    handleLoad(){
        axios.get("/studentcourse/findAll")
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
        axios.get("/studentcourse/deleteById?id="+id)
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
            title:"选课时间",
            dataIndex:"xk_time"
        },{
            title:"成绩",
            dataIndex:"grade"
        },{
            title:"学生ID",
            dataIndex:"student_id"
        },{
            title:"课程ID",
            dataIndex:"course_id"
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
        <h2>选课管理</h2>
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
export default StudentCoursePage;