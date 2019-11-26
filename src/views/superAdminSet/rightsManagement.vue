<!-- 权限管理页面-->
<template>
 <div class="table">
   <el-card class="box-card" style="margin-bottom:20px;height:138px;">
      <!-- 表单 -->
     <el-form :inline="true" :model="testForm" ref="testForm" class="demo-form-inline" style="margin-top:20px;">
        <el-form-item label="角色:" prop="role">
          <el-input v-model="testForm.role"></el-input>
        </el-form-item>
         <el-form-item>
          <div class="search" @click="onSubmit(testForm)" style="float:left"><img src="@/assets/images/home/sbtn.png"/> </div>
          <div class="search"  @click="addUser()" style="float:left;margin-left:20px;"><img src="@/assets/images/home/sbtn2.png" style="width:95px;height:40px;object-fit:fill;"/><span class="searchBtn">添加用户</span> </div>
          <div class="search"  @click="addRole()" style="float:left;margin-left:20px;"><img src="@/assets/images/home/sbtn2.png" style="width:95px;height:40px;object-fit:fill;"/><span class="searchBtn">添加角色</span> </div>
          <div class="search"  @click="editRole()" style="float:left;margin-left:20px;"><img src="@/assets/images/home/sbtn2.png" style="width:95px;height:40px;object-fit:fill;"/><span class="searchBtn">编辑角色</span> </div>
        </el-form-item>
      </el-form>
   </el-card>

   <el-card class="box-card2">
     <!-- 表格 -->
     <myTable :columns="columns" :dataSource="dataSource" :hasIndex="true" :hasSelection="false" :hasPagination="true"
      :total="total" @pageChange="pageChange" :loading="loading" >
       <el-table-column slot="operate" label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="detail(scope.row)">查看修改</el-button>
          </template>
        </el-table-column>
     </myTable>
    <!-- 添加用户 -->
     <el-dialog :visible.sync="AdddialogVisible" title='添加用户' center width="30%">
      <el-form status-icon ref="role" :model="role" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="姓名:" prop="avatar">
          <el-input v-model="role.avatar"/>
        </el-form-item>
        <el-form-item label="账号:"  prop="username">
          <el-input v-model="role.username"/>
        </el-form-item>
        <el-form-item label="密码:"  prop="password">
          <el-input v-model="role.password"/>
        </el-form-item>
         <el-form-item label="角色:"  prop="roleDesc">
              <el-select v-model="role.roleDesc" placeholder="请选择" @change="selectRole">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelAdd">取消</el-button>
        <el-button type="success" @click="confirmRoleAdd('role')">确定</el-button>
      </div>
    </el-dialog>
<!-- 添加角色 -->
      <el-dialog :visible.sync="RoledialogVisible" title='添加角色' center width="30%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="角色:">
          <el-input v-model="RoleAdd"/>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree1"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
            :check-on-click-node="true"
            @check-change="handleCheckChangeAdd"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="success" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
<!-- 编辑角色 -->
      <el-dialog :visible.sync="EditRoledialogVisible" title='编辑角色' center width="30%">
      <el-form :model="role" label-width="80px" label-position="left">
         <el-form-item label="角色:">
              <el-select v-model="role.roleDesc" placeholder="请选择" @change="editSelectRole">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
            :check-on-click-node="true"
            @check-change="handleCheckChangeEdit"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelEdit">取消</el-button>
        <el-button type="success" @click="confirmRoleEdit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
      <el-dialog :visible.sync="EditUserdialogVisible" title='编辑用户' center width="30%">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="姓名:">
          <el-input v-model="role.avatar"/>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="role.username"/>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="role.password"/>
        </el-form-item>
         <el-form-item label="角色:">
              <el-select v-model="role.roleName" placeholder="请选择" @change="selectRole">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancelEdit2">取消</el-button>
        <el-button type="success" @click="confirmRoleEdit2">确定</el-button>
      </div>
    </el-dialog>
</el-card>
 </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import myTable from "@/components/myTable";
import { mapGetters } from "vuex";
import {
  AddUser,
  getUserList,
  getRoleList,
  addRoleList,
  editRole,
  getAllRouters,
  getRoleTree,
  editUser
} from "@/api/login.js";
import { message } from "@/utils/util.js";

//弹框字段
const defaultRole = {
  avatar: "", //姓名
  username: "", //账号
  password: "", //密码
  roleName: "" //角色
};

export default {
  components: { myTable },
  data() {
    return {
      current: 1,
      size: 10,
      AdddialogVisible: false, //添加用户
      EditUserdialogVisible: false, //编辑用户
      RoledialogVisible: false, //添加角色
      EditRoledialogVisible: false, //编辑角色
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
      permissionRoutes: [], //所有路由
      role: Object.assign({}, defaultRole),
      RoleAdd: "", //添加角色中字段
      routes: [],
      checkedNodes: [], //选中的路由节点
      loading: false,
      total: 0,
      //搜索字段
      testForm: {
        role: ""
      },
      //角色下拉列表
      options: [],
      columns: [
        {
          prop: "avatar",
          label: "姓名",
          isShow: true //是否显示
        },
        {
          prop: "username",
          label: "账号",
          isShow: true
        },
        {
          prop: "roleName",
          label: "角色",
          isShow: true
        }
      ],
      dataSource: [], //用户数据
      rules: {
        avatar: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        username: [{ required: true, message: "请填写账号", trigger: "blur" }],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        roleDesc: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  computed: {
    //所有菜单
    routesData() {
      return this.routes;
    }
    // ...mapGetters(["permission_routers"])
  },
  created() {
    this.getUserList();
    this.getRoutes();
    this.getRoleList();
  },
  methods: {
    //查询角色下拉列表
    getRoleList() {
      getRoleList()
        .then(res => {
          const data = res.data.records;
          const list = data.map(item => {
            return {
              value: item.roleId,
              label: item.roleName
            };
          });
          this.options = list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查询用户列表
    getUserList() {
      this.loading = true;
      let params = { current: this.current, size: this.size };
      getUserList(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          const records = res.data.records;
          const list = records.map(item => {
            if (item.roleList.length !== 0) {
              return item.roleList.map(v => {
                return {
                  avatar: item.avatar,
                  username: item.username,
                  roleName: v.roleName,
                  userId: item.userId
                };
              });
            } else {
              return [
                {
                  avatar: item.avatar,
                  username: item.username,
                  userId: item.userId
                }
              ];
            }
          });
          var dataList = [];
          list.forEach(element => {
            element.forEach(item => {
              dataList.push(item);
              this.dataSource = dataList;
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询树的所有路由
    getRoutes() {
      getAllRouters()
        .then(res => {
          // console.log("查询树的所有路由：", res);
          this.permissionRoutes = res.data.all;
          this.routes = this.generateRoutes(this.permissionRoutes);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //添加节点
    handleCheckChangeAdd(data, checked, indeterminate) {
      let tree1 = this.$refs.tree1;
      this.checkedNodes = tree1
        .getCheckedNodes()
        .concat(tree1.getHalfCheckedNodes());
      console.log("节点：", this.checkedNodes); //获取选中的节点
    },
    //编辑选中节点
    handleCheckChangeEdit(data, checked, indeterminate) {
      let tree = this.$refs.tree;
      this.checkedNodes = tree
        .getCheckedNodes()
        .concat(tree.getHalfCheckedNodes());
      console.log("编辑选中的节点：", this.checkedNodes); //获取选中的节点
    },
    //选择角色
    selectRole(val) {
      this.role.roleDesc = val; //角色id
    },
    //添加用户
    addUser() {
      this.role = Object.assign({}, defaultRole); //清空输入框
      this.AdddialogVisible = true;
    },
    //确认添加用户
    confirmRoleAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let role = [];
          if (this.role.roleDesc) {
            role.push(this.role.roleDesc);
          }
          let params = {
            avatar: this.role.avatar,
            username: this.role.username,
            password: this.role.password,
            role: role
          };
          AddUser(params)
            .then(res => {
              this.loading = false;
              this.AdddialogVisible = false;
              if (res.code === 0) {
                message("添加成功", "success");
                this.getUserList();
                this.$refs[formName].resetFields();
              } else if (res.code === 1) {
                message("不能添加相同用户", "error");
              } else {
                message("添加失败", "error");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加角色
    addRole() {
      this.RoleAdd='';
      if (this.$refs.tree1) {
        this.$refs.tree1.setCheckedNodes([]);
      }
      this.checkStrictly = false;
      this.RoledialogVisible = true;
    },
    //确认添加角色
    confirmRole() {
      let menuId = this.checkedNodes.map(item => {
        return { menuId: item.menuId };
      });
      let params = {
        roleName: this.RoleAdd,
        menu: menuId
      };
      addRoleList(params)
        .then(res => {
          if (res.code === 0) {
            message("添加成功!", "success");
            this.getRoleList();
            this.RoledialogVisible = false;
          } else if(res.code === 1){
            message("不能添加相同角色!", "error");
          }else {
            message("添加失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //编辑角色
    editRole() {
      this.role = Object.assign({}, defaultRole); //清空输入框
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.checkStrictly = false;
      this.EditRoledialogVisible = true;
    },
    //编辑角色中选中角色事件
    editSelectRole(roleId) {
      this.checkStrictly = true;
      let params = {
        roleId: roleId
      };
      getRoleTree(params)
        .then(res => {
          // console.log("查询角色菜单：", res);
          this.$nextTick(() => {
            const routes = this.generateRoutes(res.data.act);
            // console.log("默认选中路由前：", routes);
            const checkedRoutes=this.generateArr(routes)
            // console.log("默认选中路由后：",checkedRoutes );
            this.routes.forEach(par=>{
              checkedRoutes.forEach((son,i)=>{
                if(par.menuId===son.menuId){
                  if(son.children.length<par.children.length){
                      checkedRoutes.splice(i, 1);
                  }
                }
              });
            });
            console.log("checkedRoutes:",checkedRoutes)
            this.$refs.tree.setCheckedNodes(checkedRoutes); //设置当前角色路由权限节点
            //节点的已设置检查状态不影响其父节点和子节点
            this.checkStrictly = false;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    //确认编辑角色
    confirmRoleEdit() {
      let menuId = this.checkedNodes.map(item => {
        return { menuId: item.menuId };
      });
      let params = {
        roleId: this.role.roleDesc,
        menu: menuId
      };
      // console.log(params);
      editRole(params)
        .then(res => {
          if (res.code === 0) {
            message("编辑成功!", "success");
            this.EditRoledialogVisible = false;
          } else {
            message("编辑失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //编辑用户
    detail(row) {
      // console.log("当前row:", row);
      this.EditUserdialogVisible = true;
      // this.checkStrictly = true;
      this.role = deepClone(row); //设置输入框值
    },
    //确认编辑用户
    confirmRoleEdit2() {
      let role = [];
      if (this.role.roleDesc) {
        role.push(this.role.roleDesc);
      }
      let params = {
        username: this.role.username,
        avatar: this.role.avatar,
        newpassword1: this.role.password,
        role: role, //角色id
        userId: this.role.userId
      };
      editUser(params)
        .then(res => {
          if (res.code === 0) {
            message("编辑成功!", "success");
            this.getUserList();
            this.EditUserdialogVisible = false;
          } else {
            message("编辑失败!", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.RoledialogVisible = false;
    },
    cancelAdd() {
      this.AdddialogVisible = false;
    },
    cancelEdit() {
      this.EditRoledialogVisible = false;
    },
    cancelEdit2() {
      this.EditUserdialogVisible = false;
    },
    //重新调整路由结构，使其看起来与边栏相同
    generateRoutes(routes, basePath = "/") {
      const res = [];
      // console.log("routes:", routes);
      for (let route of routes) {
        // 跳过一些路由(hidden则不显示)
        if (route.hidden) {
          continue;
        }
        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );
        // console.log("onlyOneShowingChild:",onlyOneShowingChild)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          menuId: route.menuId
        };
        // 递归的子路由
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      return res;
    },
    //过滤子路由
    generateArr(routes) {
      let data = [];
      routes.forEach(route => {
        data.push(route);
        if (route.children) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    onlyOneShowingChild(children = [], parent) {
      if (children) {
         const allroutes=this.routes;
        let onlyOneChild = null;
        const showingChildren = children.filter(item => !item.hidden);
        // 当只有一个子路由时，默认显示子路由
        if (showingChildren.length === 1) {
          onlyOneChild = showingChildren[0];
          onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path); //path.resolve() 该方法将一些的 路径/路径段 解析为绝对路径。
         return onlyOneChild;
        }
        // 如果没有要显示的子路由，则显示父路由
        if (showingChildren.length === 0) {
          onlyOneChild = { ...parent, path: "", noShowingChildren: true };
          return onlyOneChild;
        }
        return false;
      }
    },
    // 页码切换
    pageChange(page) {
      this.current = page.currentPage;
      this.size = page.pageSize;
      let params = { current: this.current, size: this.size };
      getUserList(params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total;
          const records = res.data.records;
          const list = records.map(item => {
            if (item.roleList.length !== 0) {
              return item.roleList.map(v => {
                return {
                  avatar: item.avatar,
                  username: item.username,
                  roleName: v.roleName,
                  userId: item.userId
                };
              });
            } else {
              return [
                {
                  avatar: item.avatar,
                  username: item.username,
                  userId: item.userId
                }
              ];
            }
          });
          var dataList = [];
          list.forEach(element => {
            element.forEach(item => {
              dataList.push(item);
              this.dataSource = dataList;
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 搜索
    onSubmit(formName) {
      let param = { role: formName.role };
      //   getNewsList(param)
      //     .then(res => {
      //       this.total = 1;
      //       this.dataSource = res.data.data;
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    }
  }
};
</script>

<style scoped >
.box-card {
  background-image: url("../../assets/images/home/topBg2.png");
  background-size: 100% 100%;
}
.table >>> .box-card2 {
  background-image: url("../../assets/images/home/btmBg.png");
  background-size: 100% 100%;
}
.table >>> .el-card {
  background-color: #080920;
  border: none;
}
.search {
  position: relative;
  padding-top: 5px;
}
.search:hover {
  cursor: pointer;
}
.searchBtn {
  position: absolute;
  top: 5px;
  left: 20px;
  color: #21e9f5;
}
</style>

