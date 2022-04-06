<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li :class="classPrevButton" @click="prevPage">
                <a class="page-link " href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item " @click="pageNumbers" v-for="itemPages in pages" :key="itemPages">
                <a class="page-link numberPage" :id="itemPages" href="#">{{itemPages}}</a>
            </li>
            <li :class="classNextButton" @click="nextPage">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginationPokemon',
    data() {
        return {
            classPrevButton:'page-item disabled',
            classNextButton:'page-item',
            totalPage: 0,
            pages: [1,2,3,4,5],
            actualPage: 0,
        }
    },
    mounted() {
        this.setFocusById("1");
    },
    methods: {
        prevPage(){
            if(this.actualPage>0){
                this.restarPagination();
                this.removeFocus();
                this.setFocusById(this.actualPage);
                this.actualPage = this.actualPage-1;
                this.$emit("goToPage", this.actualPage);
            }else if(this.actualPage == 0){
                this.classPrevButton = this.classPrevButton + " disabled"; //Tiene espacio para que no aparezca unido
                this.$emit("goHome");
            }
            this.setAccesibilityNextPrev();
        },
        restarPagination(){
            if(this.pages[0] != 1){
                this.pages = this.pages.map(item => item - 1);
            }
        },
        removeFocus(){
            const listNumberPage = document.querySelectorAll(".numberPage");
            if(listNumberPage.length > 0){
                listNumberPage.forEach(item=>{
                    item.classList.remove('colorSelectFocus');
                });
            }
        },
        setFocusById(idPage){
            var actualPage = document.getElementById(idPage)
            actualPage.classList += " colorSelectFocus";
        },
        setAccesibilityNextPrev(){
            if(this.actualPage == 0){
                this.classPrevButton = this.classPrevButton + " disabled";
            }else if(this.actualPage == 56){
                this.classNextButton = this.classNextButton + " disabled";
            }else if(this.actualPage>0 && this.actualPage<56){
                this.classNextButton = "page-item";
                this.classPrevButton = "page-item";
            }
        },
        pageNumbers(event){
            const numberPage = event.target.text;
            this.refreshPages(numberPage);
            console.log(numberPage);
            if(numberPage == 1){
                this.$emit("goHome");
            }else{
                this.$emit("goToPage", numberPage-1);
            }
            this.actualPage = numberPage-1;
            this.setAccesibilityNextPrev();
            this.manageFocus(event);
            console.log("Actual");
            console.log(this.actualPage);
        },
        refreshPages(item){
            if(this.pages[2]>2 && this.pages[1]!=item){
                if(this.pages[0] == item){
                    this.restarPagination();
                }else{
                    this.sumarPagination();
                }    
            }
        },
        manageFocus(item){
            this.removeFocus(); //Remover el anterior focus
            item.target.classList += " colorSelectFocus";
        },
        nextPage(){
            if(this.actualPage < 55){
                this.actualPage = this.actualPage+1;
                this.sumarPagination();
                this.$emit("goToPage",this.actualPage);
                this.removeFocus();
                this.setFocusById(this.actualPage + 1);
                console.log("Next");
                console.log(this.actualPage);
            }else if(this.actualPage == 56){
               this.classNextButton="page-item disabled"
            }
            this.setAccesibilityNextPrev();
        },
        sumarPagination(){
            if(this.pages[4]!=56){
                this.pages = this.pages.map(item => item+1);
            }
        },
    },
}
</script>

<style scoped>
    .colorSelectFocus{
        background-color: blue;
        color: white;
    }
</style>