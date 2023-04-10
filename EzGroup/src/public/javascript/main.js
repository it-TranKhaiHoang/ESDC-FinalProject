document.addEventListener('DOMContentLoaded', function () {});
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
        url: `/member/list`,
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

function fillProject() {
    $.ajax({
        url: `/project/list`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                const TableBody = document.getElementById('listProject');
                TableBody.innerHTML = ``;
                if (data.length == 0) {
                    TableBody.innerHTML = `<td colspan='6'>
                        <p class='fw-bold mb-1'>Empty</p></td>`;
                } else {
                    data.map((p) => {
                        console.log(p.member);
                        TableBody.innerHTML += `
                        <tr>
                            <td>
                                <a href="/project/${p._id}"><p class='fw-bold mb-1'>${p.name}</p></a>
                            </td>
                            <td>
                                <div class='d-flex align-items-center'>
                                        <img
                                            src='https://www.gravatar.com/avatar/${p.leader.email}?s=200&r=pg&d=retro'
                                            class='rounded-circle'
                                            alt=''
                                            style='width: 45px; height: 45px'
                                        />
                                        <div class='ms-3'>
                                            <p class='fw-bold mb-1'>${p.leader.fullname}</p>
                                        </div>
                                    </div>
                                <p class='fw-bold mb-1'></p>
                            </td>
                            <td>
                                <p class='fw-bold mb-1'>${p.start_date}</p>
                            </td>
                            <td>
                                <p class='fw-bold mb-1'>${p.end_date}</p>
                            </td>
                            <td>
                                <div class='row mb-1'>
                                    <span class='badge badge-success rounded-pill d-inline col-8'>${p.status}</span>
                                </div>
                            </td>
                            <td>
                                    <button
                                        onclick="renderContent('{{data._id}}')"
                                        type='button'
                                        data-toggle='modal'
                                        data-target='#newsModal{{data._id}}'
                                        class='btn btn-link btn-rounded btn-sm fw-bold'
                                        data-mdb-ripple-color='dark'
                                    >
                                        Sửa
                                    </button>
                                </td>
                        </tr>`;
                    });
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}
