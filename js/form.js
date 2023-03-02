const addFolderForm = document.getElementById('addFolderForm');
const folderList = document.getElementById('folderList');
const deleteTD = document.getElementById('delete');
const fileInput = document.getElementById('fileInput');

addFolderForm.addEventListener('submit', function (event) {
    event.preventDefault();  // 防止表单提交刷新页面

    const folderName = document.getElementById('folderName').value;

    if (folderName === '') {
        alert("文件名不能为空！");
        return;
    }
    const folderRow = document.createElement('tr');
    folderRow.innerHTML = `
    <td>${folderName}</td>
    <td>-</td>
    <td>-</td>
    <td><button class="delete-button">删除</button></td>
`;
    folderList.appendChild(folderRow);
    document.getElementById('folderName').value = '';

    // 为新添加的删除按钮添加点击事件监听器
    const deleteButtons = folderRow.querySelectorAll('.delete-button');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        });
    });
});

// 为文件选择器添加 change 事件监听器
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    // 判断文件类型是否为 txt
    if (file.type !== 'text/plain') {
        alert('请选择一个 txt 文件');
        return;
    }

    const reader = new FileReader();

    // 读取文件内容
    reader.onload = function () {
        const fileContent = reader.result;

        // 将文件内容转换为文件名列表
        const fileNames = fileContent.trim().split('\n');

        // 将每个文件名添加到文件夹列表中
        fileNames.forEach(function (fileName) {
            if (/^\s*$/.test(fileName)) {
            return ;
            }
            const folderRow = document.createElement('tr');
            folderRow.innerHTML = `
        <td>${fileName}</td>
        <td>-</td>
        <td>-</td>
        <td><button class="delete-button">删除</button></td>
    `;
            folderList.appendChild(folderRow);

            // 为新添加的删除按钮添加点击事件监听器
            const deleteButtons = folderRow.querySelectorAll('.delete-button');
            deleteButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    const row = button.parentNode.parentNode;
                    row.parentNode.removeChild(row);
                });
            });
        });
    };

    reader.readAsText(file);
});

// 为已经存在的删除按钮添加点击事件监听器
const deleteButtons = folderList.querySelectorAll('.delete-button');
deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    });
});        