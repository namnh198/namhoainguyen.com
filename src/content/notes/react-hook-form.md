---
title: React Hook Form & Related Things
published: true
draft: true
tags:
  - Web-Dev
  - Node-Js
  - React-Js
createDate: 2024-08-10
---
## References 
- [Official Docs](https://react-hook-form.com/) [Github Repo](https://github.com/react-hook-form/react-hook-form)
- Nên dùng [zod](https://zod.dev/) để quản lý validation, nó cũng cho phép tạo schema xong generate type dựa trên schema này. [Shacdn](https://ui.shadcn.com/docs) dùng nó mặc định
## Decorate input border when there is error (with [Shadcn's form](https://ui.shadcn.com/docs/components/form))
Để decorate của `Slot` bên trong `FormControl` có tác dụng lên `Input` thì phải để `Input` ngay trong `FormControl`

```jsx title="form.tsx"
<Slot 
	// other properties
	className={cn(error && 'border-destructive')}
/>
```

```jsx title="input.tsx"
<FormControl>
	<Input /> // make sure Input is a direct child of FormControl
</FormControl>
```
## Nested Form Array nhưng index không update UI đúng như code
Nếu dùng `console.log` thì update đúng, còn trong UI thì lại không đúng. VD **remove clicked** thì index cuối luôn bị **remove** (UI) thay vì ngay cái index clicked
Lỗi tại `key = {}`

```jsx
const { fields: nestedFields } = useFieldArray({ control, name});

// ...
{nestedFields.map((nestedItem, index) => (
	<NestedItem key={nestedITem.id} /> // should be .id
))}
```
## Custom validator 
Check [this example](https://zod.dev/?id=customize-error-path)
## Nếu như `form` không tự validate (chỉ sau khi submit mới validate)

Check xem có thêm `{ ...field }` vào trong form chưa

```jsx
<FormControl>
	<Input placeholder='Enter something...' { ...field }
</FormControl>
```