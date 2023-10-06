import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPage implements OnInit, AfterViewInit {

    @ViewChild('loadingMsg') loadingMsgRef!: ElementRef;
    @ViewChild('loading') loadingRef!: ElementRef;
    @ViewChild('header') headerRef!: ElementRef;

	show: boolean = true;	
	
    constructor() { }

    ngAfterViewInit(): void {
        this.setLoading(this.show, 'Listing...');
        setTimeout(() => {
        	this.show = false;
        	console.log(this.show);
        }, 5*1000);
        //setInterval("console.log(this.show);", 1000);
    }

    ngOnInit() {
    }

    /////////////////////////
    // UTILS
    setLoading(show: boolean, message: any) {
        const loadingMsg: HTMLElement = this.loadingMsgRef.nativeElement;
        if (message) loadingMsg.innerHTML = message;

        console.log('loadingMsgRef', this.loadingMsgRef);
        console.log('loadingRef', this.loadingRef);
        

        const loading: HTMLElement = this.loadingRef.nativeElement;
        if (show) loading.classList.add("shown");
        else loading.classList.remove("shown");
        document.body.style.cursor = show ? "wait" : "default";
    }
    
    readableSize(bytes: number): string {
        if (bytes < 1024) return bytes + " B";
        let units: string[] = [' KiB', ' MiB', ' GiB', ' TiB', 'PiB'];
        let i: number = -1;
        do {
            bytes = bytes / 1024;
            i++;
        } while (bytes > 1024);
        return bytes.toFixed(2) + units[i];
    }

	refreshStatus() {

            // document.getElementById("status").innerHTML = "(refreshing...)";
    }

    showHttpError(request: XMLHttpRequest): void {
        alert("ERROR: [" + request.status + "] " + request.responseText);
    }

    canLoadNewContents(): boolean {
        // The fact the save button is enabled indicates the editor has unsaved changes
        // if (document.getElementById("saveBtn").disabled) return true;
        if (confirm("Changes to your document will be lost if you continue")) {
            this.enableSaveDiscardBtns(false);
            return true;
        }
        return false;
    }

    enableSaveDiscardBtns(enabled: boolean) {
        //document.getElementById("saveBtn").disabled = !enabled;
        //document.getElementById("discardBtn").disabled = !enabled;
    }

    /*
     * Returns the parent folder of a given path
     * ""      > ""
     * "/"     > ""
     * "a"     > ""
     * "/a"    > ""
     * "a/"    > ""
     * "/a/"   > ""
     * "a/b"   > "/a"
     * "/a/b"  > "/a"
     * "a/b/"  > "/a"
     * "/a/b/" > "/a"
     */
     
    getParentFolder(path: string): string {
        if (!path.startsWith("/")) path = "/" + path;
        if (path.endsWith("/")) path = path.slice(0, -1);
        return path.substring(0, path.lastIndexOf("/"));
    }

    /////////////////////////
    // HEADER with uploader, buttons and status
	createHeader(element: any, tree: any, editor: any) {
	}

    /////////////////////////
    // FILE TREE
    createTree(element: any, editor: any) {
    }

    /////////////////////////
    // ACE EDITOR MANAGEMENT
    createEditor(element: any, file: any, lang: any, theme: any, type: any) {
    }

    /////////////////////////
    // MAIN ENTRY POINT
    onBodyLoad() {
    }

}
