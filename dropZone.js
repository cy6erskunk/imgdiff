(function () {

    var DropZone = function (dropZoneSelector, filesInput) {
        if (!window.File && window.FileReader && window.FileList && window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
        } else {
            this.dropZone = document.querySelector(dropZoneSelector);
            this.dropZone.addEventListener('dragover', this.dragOverHandler.bind(this), false);
            this.dropZone.addEventListener('drop', this.dropHandler.bind(this), false);

            if (filesInput) {
                this.filesInput = document.querySelector(filesInput);
                this.filesInput.addEventListener('change', this.handleFileSelect.bind(this), false);

                this.dropZone.addEventListener('click', () => {
                    this.filesInput.click();
                });
            }
        }
    };

    DropZone.prototype.dropHandler = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.displayInfo(evt.dataTransfer.files);
        this.handleFileSelect(evt);
    };

    DropZone.prototype.dragOverHandler = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        evt.dataTransfer.dropEffect = 'copy';
    };

    DropZone.prototype.displayInfo = function (files) {
        var output = [];
        for (var i = 0, f; (f = files[i]); i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
        }

        /* eslint no-console: 0 */
        console.log('<ul>' + output.join('') + '</ul>');
    };

    DropZone.prototype.handleFileSelect = function (evt) {
        var files = (evt.dataTransfer || evt.target).files;
        this.displayInfo(files);

        for (var i = 0, f; (f = files[i]); i++) {

            var reader = new FileReader();

            reader.onload = (() => {
                return e => {
                    var img = document.createElement('img');

                    img.src = e.target.result;
                    img.classList.add('dropped-image');

                    this.dropZone.innerHTML = '';
                    this.dropZone.appendChild(img);
                };
            })(f);

            reader.readAsDataURL(f);
        }
    };

    window.DropZone = DropZone;
})();
