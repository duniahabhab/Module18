namespace Notes.DBModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class ChatBoard
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string FromUser { get; set; }
        public string DateTimeOfMessage { get; set; }
    }
}