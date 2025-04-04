# Vue3 文件录入系统开发需求

## **技术栈**
- Vue3
- Vite
- Naive UI
- Pinia（含持久化插件）
- IndexedDB（idb存储）
- Vue Router

## **功能需求**
1. **录入数据**
   - 录入表单页面，支持用户提交数据。
   - 提交后数据存储到 IndexedDB，并在 `data` 页面展示。
   - 录入实时根据数据类型进行校验，检查逻辑错误
   - 提交前支持数据校验，检查逻辑错误

2. **数据展示**
   - `data` 页面使用 Naive UI 的 `n-table` 组件展示已提交的数据。
   - 表格每行包含数据展示，以及操作按钮（修改、删除）。

3. **数据操作**
   - **修改**
     - 点击“修改”按钮，跳转到录入页面，并填充已选数据。
     - 右上角弹出提示“正在修改”。
     - 修改后提交，更新 IndexedDB 数据，并刷新 `data` 页面。

   - **删除**
     - 点击“删除”按钮，弹出确认对话框。
     - 确认后删除数据，并更新 `data` 页面。

## **交互细节**
- 录入表单提交后，页面弹出“提交成功”通知。
- 进入修改页面时，右上角弹出“正在修改”提示。
- 删除前弹出 Naive UI 确认框，防止误删。

## **数据存储**
- 使用 Pinia 进行状态管理，并持久化到 IndexedDB。
- 提交数据时，同步存储到 Pinia 和 IndexedDB。
- `data` 页面读取 IndexedDB 数据并渲染到表格。
- `data` 页面支持数据导入导出。

## **国际化** 
- 支持多语言

## **路由设计**
| 路由路径   | 组件            | 说明            |
|------------|---------------|----------------|
| `/`        | `HomeView.vue` | 主页           |
| `/data`    | `DataView.vue` | 数据展示页面   |
| `/submit`  | `SubmitView.vue` | 数据录入页面 |

## **UI 组件**
- Naive UI:
  - `n-form` 用于数据录入
  - `n-table` 展示数据
  - `n-button` 用于提交、修改、删除操作
  - `n-dialog` 进行删除确认
  - `n-notification` 进行状态提醒

  naive-ui 建议使用 xicons 作为图标库。 

## naivu组件库官网如下
https://naiveui.com/
---

## 代码风格
- vue使用 setup语法
- 组件化开发  
- 多语言支持
请基于此需求开发完整的 Vue3 文件录入系统。尽可能低耦合，组件化开发。界面美观，功能完善。

