using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace MRModel.Base
{
    public class MvResponse<T>
    {
        [AllowNull]
        public string Text { get; set; }
        [AllowNull]
        public string Type { get; set; }
        [AllowNull]
        public MvData<T> Response { get; set; }
    }

    public class MvData<T>
    {
        public List<T> Data { get; set; } // list of T
        public int? TotalRows { get; set; } // Total no of rows if List<T> Data is for Grid
        public dynamic? Extra { get; set; } // use if any extra information / data needed to be fetched
    }

    public class MvPost
    {
        [AllowNull]
        public object Json { get; set; }
    }

    #region ListItem
    public class MvListItem
    {
        public int ListItemId { get; set; }
        public string ListItem { get; set; }
        public string Description { get; set; }
        public int ListItemCategoryId { get; set; }
        public string Category { get; set; }
        public string DescriptionCategory { get; set; }
        public bool IsSystem { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class MvListItemList
    {
        public int ListItemId { get; set; }
        public string ListItem { get; set; }
        public string Description { get; set; }
    }

    public class MvListItemCategory
    {
        public int ListItemCategoryId { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public bool IsSystem { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
    #endregion ListItem
}
