import React from "react";

const Table = () => {
    return (
        <div>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                <table class="table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#0012451</td>
                            <td>Summary File</td>
                            <td>Attachment</td>
                            <td>Download Now</td>
                        </tr>
                        <tr>
                            <td>#0012451</td>
                            <td>Summary File</td>
                            <td>Attachment</td>
                            <td>Download Now</td>
                        </tr>
                        <tr>
                            <td>#0012451</td>
                            <td>Summary File</td>
                            <td>Attachment</td>
                            <td>Download Now</td>
                        </tr>
                        <tr>
                            <td>#0012451</td>
                            <td>Summary File</td>
                            <td>Attachment</td>
                            <td>Download Now</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
