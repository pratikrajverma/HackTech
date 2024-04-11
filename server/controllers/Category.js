const Category = require("../models/Category");

//...................................................create categories......................
const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400).json({
					success: false,
					message: "All fields are required" 
				});
		} 

		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log(CategorysDetails);

		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} 
	catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

//......................................................show all categories.....................

const showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true , description: true}
		);

		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



//....................................................show course by click on category..........................

const categoryPageDetails = async (req, res) => {
	try{
		//get gategories
		const {categoryId} = req.body;	

		//get course by specified categoryId
		const selectedCategory = await Category.findById(categoryId)
												.populate("courses")
												.exec();
												
		//validation
		if(!selectedCategory)
		{
			return res.status(404).json({
                success: false,
                message: "Data not found",
            });
		}
		console.log(selectedCategory); 


		//get course for different category
		const differentCategory = await Category.find({
													_id: {  $ne: categoryId }				//ye wo category ko fetch kar raha he jsko user ne select nahi kiya he 
												})
												.populate("courses")
												.exec();


        //HW  get top  10 selling course 


		//return response
		return res.status(200).json({
			success: true,
            data: {
                selectedCategory: selectedCategory,
                differentCategory: differentCategory,
            },
		})
		 
	}	
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

module.exports = { createCategory, showAllCategories, categoryPageDetails }