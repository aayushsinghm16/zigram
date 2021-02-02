<template>
    <section>
      <div class="main-container">
        <h1>zigram</h1>
        <input type="text" v-model="searchQuery" @input="searchName">
        <div class="filters">
          <div class="categories" v-if="categoryList && categoryList.length>0">
            <h2>Categories</h2>
            <div v-for="item in categoryList">
              <input type="checkbox" :value="item.strCategory" :checked="selectedCategories == item.strCategory" @input="categoryChange(item.strCategory,'category')">
              {{item.strCategory}}
            </div>
          </div>
          <div class="categories" v-if="ingredientsList && ingredientsList.length>0">
            <h2>Ingredients</h2>
            <div v-for="item in ingredientsList">
              <input type="checkbox" :value="item.strIngredient1" :checked="selectedIngredient == item.strIngredient1" @input="categoryChange(item.strIngredient1,'ingredient')">
              {{item.strIngredient1}}
            </div>
          </div>
        </div>
        <div class="cards-container">
          <div class="card" v-for="item in cocktails">
            <img src="https://www.thecocktaildb.com/images/ingredients/gin-Medium.png " alt="">
            <p>{{item.strDrink}}</p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  mounted() {
    this.cocktailsByName();
    this.cocktailsCategories();
    this.cocktailsRandom();
    this.ingredientsCategories();
  },
  data() {
    return {
      selectedCategories:undefined,
      selectedIngredient:undefined,
      searchQuery:'',
      debounce:undefined
    }
  },
  computed: {
    ...mapState({
      categoryList:state=>state.app.categoryList,
      cocktails:state=>state.app.cocktails,
      ingredientsList:state=>state.app.ingredientsList
    })
  },
  methods: {
    ...mapActions({
      cocktailsByName:'app/cocktailsByName',
      cocktailsCategories:'app/cocktailsCategories',
      cocktailsRandom:'app/cocktailsRandom',
      cocktailsByCategories:'app/cocktailsByCategories',
      ingredientsCategories:'app/ingredientsCategories',
      cocktailsByIngredients:'app/cocktailsByIngredients',
      cocktailsByName:'app/cocktailsByName'
    }),
    categoryChange(value,type){
      console.log(value)
      let queryName = value.replaceAll(" / ","_")
      
      if(type == 'category'){
        this.selectedCategories = value;
        this.selectedIngredient = undefined
        this.cocktailsByCategories(queryName)
      }
      else if(type == 'ingredient'){
        this.selectedIngredient = value;
        this.selectedCategories = undefined
        this.cocktailsByIngredients(queryName)
      }
      
    },
    searchName(){
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.cocktailsByName(this.searchQuery)
        this.selectedIngredient = undefined;
        this.selectedCategories = undefined
      }, 600);
    }
  },
}
</script>
<style lang="scss" scoped>
section{
  .main-container{
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 48px calc(100vh - 48px);
    &>h1{
      // grid-column: 1/3;
      height: 32px;
      margin: 0px;
      padding: 0px 16px;
      line-height: 32px;
    }
    &>input{
      margin: 8px 16px;
    }
    .filters{
      display: grid;
      padding: 16px;
      grid-template-rows: 1fr 1fr;
    }
    .cards-container{
      display: grid;
      grid-template-columns: repeat( auto-fill, minmax(350px, 1fr) );
      padding: 16px;
      grid-gap: 8px;
      .card{
        box-shadow: 0px 0px 3px 1px #00000080;
        p{
          text-align: center;
        }
      }
    }
  }
}
</style>