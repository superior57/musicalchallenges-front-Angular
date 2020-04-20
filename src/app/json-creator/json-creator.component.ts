import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";

@Component({
    selector: 'json-creator',
    styleUrls: ['./json-creator.component.css'],
    templateUrl: './json-creator.component.html',
})
// class Select
export class JsonCreatorComponent implements OnInit {
    arrRows = [];

    constructor() {        
        this.arrRows = [];
        this.arrRows.push({
            text: "",
            start: "",
            end: ""
        });
        //this.search.email = ''
    }
    ngOnInit(): void {		
    }
    addRow = function() {
        this.arrRows.push({
            text: "",
            start: "",
            end: ""
        });
    }
    deleteRow = function(idx) {
        if (confirm("Are you sure to delete this row?")) {
            this.arrRows.splice(idx, 1);
        }
    }
    valueChange = function(idx, type, value) {
        switch (type) {
            case 0:
                this.arrRows[idx]["text"] = value;
                break;
            case 1:
                this.arrRows[idx]["start"] = value;
                break;
            case 2:
                this.arrRows[idx]["end"] = value;
                break;
        }
    }
    saveContent = function() {
        this.arrRows.forEach(function(item, idx) {
            item["index"] = idx + "";
            item["text"] = item["text"].replace(/\\n/g, "\n");
            item["timestamp"] = item["start"] + " --> " + item["end"];
        });
        // var file = new Blob([JSON.stringify(this.arrRows, null, 2)], {type : 'application/json'})
        // var url = URL.createObjectURL(file);
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.arrRows, null, 2)));
        element.setAttribute('download', "lyrics.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        // window.open(url)
    }	
}
