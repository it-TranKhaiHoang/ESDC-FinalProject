document.addEventListener('DOMContentLoaded', function () {
    getNumberOfProject();
});
initCalendar();
fillOption();

function initCalendar() {
    let calendarEl = document.getElementById('calendar');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    let calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialDate: formattedDate,
        navLinks: true, // can click day/week names to navigate views
        nowIndicator: true,

        weekNumbers: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        selectable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [],
    });
    calendar.render();
    $.ajax({
        url: `/project/list`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                data.map((p) => {
                    calendar.addEvent({
                        title: p.name,
                        url: `/project/${p._id}`,
                        start: p.start_date,
                        end: p.end_date,
                    });
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}

function fillOption() {
    $.ajax({
        url: `/member/listLeader`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                console.log(data);
                const select = document.getElementById(`Assignee`);
                select.innerHTML = ``;
                select.innerHTML += `<option selected>Open this select member</option>`;
                data.map((m) => {
                    select.innerHTML += `<option value='${m._id}'>${m.fullname}</option>`;
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}

function taskClick(id) {
    $.ajax({
        url: `/task/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                console.log(data);
                const info = document.getElementById('task-info');
                const countAttachments = data.attachments.length;
                let taskSingle = ``;
                let btn = ``;
                let attachments = data.attachments;
                attachments.forEach((item) => {
                    const fileName = item.split('/').pop();
                    const extension = item.split('.').pop();
                    let path = '/img/icon/file.png';
                    if (extension == 'jpg' || extension == 'png' || extension == 'icon' || extension == 'svg')
                        path = item;
                    else if (extension == 'pdf') path = '/img/icon/pdf.png';
                    else if (extension == 'doc' || extension == 'docx') path = '/img/icon/doc.png';
                    taskSingle += `
                    <a href="${item}" target="_blank" class="task-single">
                        <img src="${path}" alt="">
                        <div class="attach-info px-2 py-2">
                            <span style="font-weight: 600">${fileName}</span>
                        </div>
                    </a>
                    `;
                });
                if (data.status == 'pending')
                    btn += `<a href="/task/complete/${data._id} type="button" class="btn btn-success">Accept</a>`;
                info.innerHTML = `
                <h4>${data.name}</h4>
                <div class="link-issue my-3">
                    <button class=" btn btn-primary"><i class="fa fa-paperclip" aria-hidden="true"></i> Attach</button>
                    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#staticBackdrop">
                        <i class="fa fa-plus" aria-hidden="true"></i> Add member
                    </button>
                </div>
                <div class="description-box mb-3"> 
                    <span><strong>Description</strong></span>
                    <br>
                    <p>${data.description}</p>
                </div>
                <div class="attachment-box mb-3"> 
                    <span><strong>Attachments (${countAttachments})</strong></span>
                    <br>
                    ${taskSingle}
                </div>
                ${btn}
                <a href="/task/cancel/${data._id}" type="button" class="btn btn-danger">Cancel</a>
                `;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}

function getNumberOfProject() {
    $.ajax({
        url: `/project/list`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                const count = document.getElementById('count-project');
                count.innerText = data.length;
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}
